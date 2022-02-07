import React,{useEffect} from "react";
import { useNFTBalances } from "react-moralis";
import AddForTrade from "./AddForTrade";

const NftList = (props) => {
    const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();

    useEffect(() => {getNFTBalances({ params: { address:props.add } })},[])
    console.log(props.tId,"efwefwe")
    return(
        <div class="container">
  <div class="row row-cols-3 m-4">
    {
       data && data.result.map((nft)=>(
                <AddForTrade src={nft.token_uri} id={nft.token_id} contract={nft.token_address} tId={props.tId}/>
            
        ))
}
  </div>
</div>
    )
}

export default NftList;