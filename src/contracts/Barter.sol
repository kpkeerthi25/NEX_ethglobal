// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;

  Counters.Counter private _tradeItemIds;
  Counters.Counter private _NftItemId;

  address payable owner;

  constructor() {
    owner = payable(msg.sender);
  }

//trade item struct 
  struct TradeItem {
      uint256 tradeItemId;
      uint256 item1;
      uint256 item2;
      address creator;
      address participant;
      bool isActive;
      bool isComplete;
  }

//single NFT struct
  struct NftItem {
    uint256 NftItemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    bool isApprovedByTrader;
    bool isActive;
  }

  mapping(uint256 => TradeItem) private idToTradeItem;
  mapping(uint256 => NftItem) private idToNft;
  mapping(address => uint256) private TradeItemCreatorCount;
  mapping(address => uint256) private TradeItemParticipantCount;

  function createNftItem(
    address nftContract,
    uint256 tokenId
    ) internal returns (uint256) {

      _NftItemId.increment();
      uint256 NftItemId = _NftItemId.current();

      idToNft[NftItemId] = NftItem(
        NftItemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(address(0)),
        false,
        true
      );
      IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

      return NftItemId;
    }

//to create initial trade item with 1 nft
  function createTradeItemWith1Nft(
    address nftContract,
    uint256 tokenId
  ) public nonReentrant {
    _tradeItemIds.increment();
    uint256 tradeItemId = _tradeItemIds.current();

    idToTradeItem[tradeItemId] = TradeItem(
      tradeItemId,
      createNftItem(nftContract,tokenId),
      0,
      msg.sender,
      address(0),
      true,
      false
    );

    TradeItemCreatorCount[msg.sender]++;
}

  function addNft(
    uint256 tradeItemId,
    address nftContract,
    uint256 tokenId
  ) public nonReentrant {
    if(msg.sender == idToTradeItem[tradeItemId].creator){
      if(idToTradeItem[tradeItemId].item1==0)
      idToTradeItem[tradeItemId].item1 = createNftItem(nftContract,tokenId);
    }
    else if(_tradeItemIds.current() >= tradeItemId && idToTradeItem[tradeItemId].isActive == true && idToTradeItem[tradeItemId].item2==0) {
      idToTradeItem[tradeItemId].item2 = createNftItem(nftContract,tokenId);
      idToTradeItem[tradeItemId].participant = msg.sender;
      TradeItemParticipantCount[msg.sender]++;
    }
    else
    revert("ERROR: NFT not added");
    
  }

  function proceedTrade(
    uint256 tradeItemId
  ) internal nonReentrant {
    address creator = idToTradeItem[tradeItemId].creator;
    address participant = idToTradeItem[tradeItemId].participant; 
    uint256 Item1TokenId = idToNft[idToTradeItem[tradeItemId].item1].tokenId;
    address Item1Contract = idToNft[idToTradeItem[tradeItemId].item1].nftContract;

    uint256 Item2TokenId = idToNft[idToTradeItem[tradeItemId].item2].tokenId;
    address Item2Contract = idToNft[idToTradeItem[tradeItemId].item2].nftContract;

    IERC721(Item1Contract).transferFrom(address(this), participant, Item1TokenId);
    IERC721(Item2Contract).transferFrom(address(this), creator, Item2TokenId);
  }

  function approveNft(
    uint256 tradeItemId,
    uint256 nftNo
  ) public {
     if (msg.sender == idToNft[nftNo].seller)
        revert("Trader cannot approve his own NFT for trade.");
     else if(!(idToTradeItem[tradeItemId].isActive || idToNft[nftNo].isActive)) {
        revert("This trade or nft item is not active at the moment");
     }
     else if(!(idToTradeItem[tradeItemId].item1==nftNo || idToTradeItem[tradeItemId].item2==nftNo))
        revert("This trade item does not contain this nft token");
     else {
        idToNft[nftNo].isApprovedByTrader = true;
     }

     if(idToNft[idToTradeItem[tradeItemId].item1].isApprovedByTrader && idToNft[idToTradeItem[tradeItemId].item2].isApprovedByTrader && idToTradeItem[tradeItemId].isActive && idToNft[idToTradeItem[tradeItemId].item1].isActive && idToNft[idToTradeItem[tradeItemId].item2].isActive)
        proceedTrade(tradeItemId);
  }

  function removeNft(
    uint256 tradeItemId
  ) public {
    if(idToTradeItem[tradeItemId].creator == msg.sender) {
      uint256 nftNo = idToTradeItem[tradeItemId].item1;
      IERC721(idToNft[nftNo].nftContract).transferFrom(address(this), msg.sender, idToNft[nftNo].tokenId);
      idToNft[nftNo].isActive = false;
      idToTradeItem[tradeItemId].item1=0;
    }
    else if(idToTradeItem[tradeItemId].participant == msg.sender ) {
      uint256 nftNo = idToTradeItem[tradeItemId].item2;
      IERC721(idToNft[nftNo].nftContract).transferFrom(address(this), msg.sender, idToNft[nftNo].tokenId);
      idToNft[nftNo].isActive = false;
      TradeItemParticipantCount[msg.sender]--;
      idToTradeItem[tradeItemId].item2=0;
    }
    else 
    revert("ERROR: NO NFT IS REMOVED");
  }

  function deleteTradeItem(
    uint256 tradeItemId
  ) public {
    if(idToTradeItem[tradeItemId].creator == msg.sender && _tradeItemIds.current()>=tradeItemId) {
      idToTradeItem[tradeItemId].isActive = false;
      TradeItemCreatorCount[msg.sender]--;
      if(idToTradeItem[tradeItemId].item2 != 0 ) {
        IERC721(idToNft[idToTradeItem[tradeItemId].item2].nftContract).transferFrom(address(this), idToTradeItem[tradeItemId].participant, idToNft[idToTradeItem[tradeItemId].item2].tokenId);
        idToNft[idToTradeItem[tradeItemId].item2].isActive = false;
      }

      if(idToTradeItem[tradeItemId].item1 != 0 ) {
        IERC721(idToNft[idToTradeItem[tradeItemId].item1].nftContract).transferFrom(address(this), idToTradeItem[tradeItemId].creator, idToNft[idToTradeItem[tradeItemId].item1].tokenId);
        idToNft[idToTradeItem[tradeItemId].item1].isActive = false;
      }
    }
    else 
    revert("ERROR: TRADE DOES NOT EXIST YOU ARE NOT CREATOR OF THIS TRADE");
  }

  function getListedNfts() public view returns (NftItem[] memory) {
    uint totalItemCount = _NftItemId.current();
    uint nftCount=0;
    uint currentIndex = 0;
    for(uint i=0; i<totalItemCount; i++) {
      if(idToNft[i+1].seller == msg.sender && idToNft[i+1].isActive) {
        nftCount = nftCount + 1;
      }
    }
    NftItem[] memory items = new NftItem[](nftCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToNft[i + 1].seller == msg.sender && idToNft[i + 1].isActive) {
        uint currentId = i + 1;
        NftItem storage currentItem = idToNft[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function getNftItem(uint256 nftNo) public view returns (NftItem memory) {
    return idToNft[nftNo];
  }

  function getTradeItem(uint256 No) public view returns (TradeItem memory) {
    return idToTradeItem[No];
  }

  function getActiveTradesCreated() public view returns (TradeItem[] memory) {
    uint totalItemCount = _tradeItemIds.current();
    uint tradeCount=TradeItemCreatorCount[msg.sender];
    uint currentIndex = 0;

    TradeItem[] memory items = new TradeItem[](tradeCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToTradeItem[i + 1].creator == msg.sender && idToTradeItem[i + 1].isActive) {
        uint currentId = i + 1;
        TradeItem storage currentItem = idToTradeItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;

  }

  function getActiveTradesParticipated() public view returns (TradeItem[] memory) {
    uint totalItemCount = _tradeItemIds.current();
    uint tradeCount= TradeItemParticipantCount[msg.sender];
    uint currentIndex = 0;

    if(tradeCount==0) {
      revert("ERROR: NO TRADE ITEM AVAILABLE");
    }

    TradeItem[] memory items = new TradeItem[](tradeCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if((idToTradeItem[i+1].participant == msg.sender) && idToTradeItem[i+1].isActive) {
        uint currentId = i + 1;
        TradeItem storage currentItem = idToTradeItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;

  }

}
