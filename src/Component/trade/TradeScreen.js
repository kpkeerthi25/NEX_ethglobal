import React,{useState,useEffect} from "react";
import Barter from "../../contracts/Barter.json"
import TradeTile from "./TradeTile";
import Moralis from "moralis";

const TradeScreen = () => {

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
<div>
    <h1>Trade Screen</h1>

    <div className="container">
        <div>
            <h3>
                Trades Created
            </h3>
            <TradeTile/>
        </div>

        <div>
            <h3>
                Trades Participating
            </h3>
        </div>

    </div>
</div>
    )
}

export default TradeScreen;