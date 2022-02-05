import React from "react";
import Barter from "../contracts/Barter.json"
import Moralis from "moralis";

const NftTile = (props) => {

    const createTrade = async() => {
        const options = {
            abi:Barter,
            contractAddress: process.env.REACT_APP_BARTER,
            functionName: "createTradeItemWith1Nft",
            params:{
                nftContract:props.contract,
                tokenId:props.id
            }
          }
          const res = await Moralis.executeFunction(options);
          console.log(res);
    }
    return(
        // <div class="col border  p-3 "  key={props.index} >
        //     <img src={props.src} className="rounded"/>
        //     <div>
        //         <button style={{marginLeft:"30%"}}> Create Trade </button>
        //     </div>
        // </div>
        <div class="px-3 py-4">
            <div class="col card " >
        <img src={props.src} class="card-img-top" alt="..."/>
        <div class="card-body">
          <h5 class="card-title">DINO #{props.id}</h5>
          <p >{props.contract}</p>
          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <a href="#" class="btn btn-primary" onClick={()=>{createTrade()}}>Create Trade</a>
        </div>
      </div>
        </div>
        
    )
}

export default NftTile;