import React,{useEffect} from "react";
import { useNFTBalances } from "react-moralis";
import NftTile from "./NftTile";

const MyNfts = (props) => {
    const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();

    useEffect(() => {getNFTBalances({ params: { address:props.add } })},[])
    console.log(data)
    return(
        <div class="container">
  <div class="row row-cols-3 m-4">
    {
       data && data.result.map((nft)=>(
                <NftTile src={nft.token_uri} id={nft.token_id} contract={nft.token_address}/>
            
        ))
}
  </div>
</div>
    )
}

export default MyNfts;