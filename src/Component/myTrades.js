import React,{useState,useEffect} from "react";
import Barter from "../contracts/Barter.json"
import Moralis from "moralis";
import { TransactionDescription } from "ethers/lib/utils";

const MyTrades = (props) => {
    
    const options = {
        abi:Barter,
        contractAddress: process.env.REACT_APP_BARTER,
        functionName: "getActiveTradesCreated",
      }
      const options1 = {
        abi:Barter,
        contractAddress: process.env.REACT_APP_BARTER,
        functionName: "getActiveTradesParticipated",
      }
    const [trades, setTrade] = useState([])
    const [partTrade,setPartTrade] = useState([])
    useEffect(async()=>{
        const data = await Moralis.executeFunction(options);
        
        setTrade(data)
        try{
            const partdata = await Moralis.executeFunction(options1);
            if(partdata.data.code!=3)
            setPartTrade(partdata)
        }
        catch{

        }
       
        console.log(data)
    },[])

    return(
        <div class="container">
            <h3>Trades Created (ACTIVE) </h3>
        <div class="row row-cols-1 m-4">
          {
             trades && trades.map((data)=>(
                       <li>
                {data.tradeItemId.toString()}
                </li>
                  
              ))
           
      }
        </div>

        <h3>Trades Participated (ACTIVE)</h3>
        <div class="row row-cols-1 m-4">
          {
             partTrade && partTrade.map((data)=>(
                       <li>
                {data.tradeItemId.toString()}
                </li>
                  
              ))
           
      }
        </div>
      </div>
    )
    
}

export default MyTrades;