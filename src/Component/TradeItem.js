import React, { useEffect, useState } from 'react'
import Barter from '../contracts/Barter.json'
import NFTABI from "../contracts/NFT.json"
import Moralis from 'moralis'
import { use } from 'chai'

const TradeItem = (props) => {
  const [tradeId, setTradeId] = useState(0)
  const [nft1, setNft1] = useState({})
  const [nft2, setNft2] = useState({})
  const [uri1,setUri1] = useState("")
  const [uri2,setUri2] = useState("")
  const searchTrade = async () => {
    const options = {
      abi: Barter,
      contractAddress: process.env.REACT_APP_BARTER,
      functionName: 'getTradeItem',
      params: {
        No: tradeId,
      },
    }
    const nftoptions = {
      abi: Barter,
      contractAddress: process.env.REACT_APP_BARTER,
      functionName: 'getNftItem',
    }

    
    // console.log(tradeId.toString());
    try {
      const data = await Moralis.executeFunction(options)
      console.log(data)
      if (data.item1 > 0) {
        const NFT1 = await Moralis.executeFunction({
          ...nftoptions,
          params: { nftNo: data.item1 },
        })
        console.log(NFT1)
        setNft1((NFT1))
      }
      else{
          console.log("hey")
          setNft1({})
          setUri1("")
      }
      if (data.item2 > 0) {
        const NFT2 = await Moralis.executeFunction({
          ...nftoptions,
          params: { nftNo: data.item2 },
        })
        console.log(NFT2)
        setNft2(NFT2)
        setUri2("")
      }
      else{
        setNft2({})
      }
    } catch {}
  }

  useEffect(async()=>{
    const nftDataOption = {
        abi: NFTABI,
      contractAddress: process.env.NFT,
      functionName: 'tokenURI',

    }
      const imgs =  await Moralis.executeFunction({
        ...nftDataOption,
        params: { tokenId:(parseInt(nft1.tokenId)) },
      })
      console.log(imgs)
    setUri1(imgs)
  },[(parseInt(nft1.tokenId))])

 
  return (
    <div>
      <div className="container mt-5">
        <input
          type="text"
          placeholder="TradeId"
          className="mx-4"
          value={tradeId}
          onChange={(e) => setTradeId(e.target.value)}
        ></input>
        <button className="primary" onClick={() => searchTrade()}>
          {' '}
          search
        </button>
<div class="row row row-cols-2 m-4">


        {
         parseInt(nft1.tokenId)!=NaN && <div class="card col">
        <img src={uri1} class="rounded" alt="..." />
        <div class="card-body">
          <h5 class="card-title">DINO #{parseInt(nft1.tokenId)}</h5>
        </div>
       
        {nft1 && nft1.seller.toLowerCase() == (props.add.toString()) && !nft1.isApprovedByTrader && <h5> not Approved </h5>}
      </div>
     }
          { parseInt(nft2.tokenId)!=NaN && (<div class="card col">
        <img src={uri2} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">DINO #{parseInt(nft2.tokenId)}</h5>
        </div>
      </div>)}
      </div>
   </div>

     
     
      
    </div>
  )
}

export default TradeItem
