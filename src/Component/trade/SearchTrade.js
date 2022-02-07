import React,{useState} from 'react'
import Moralis from 'moralis'
import Barter from "../../contracts/Barter.json"
import MyNfts from '../MyNfts'
import NftList from "./NftList"
import { propTypes } from 'react-bootstrap/esm/Image'
const SearchTrade = () => {
    const [tId,setTd] = useState("")
    const [tradeobj,setTradeobj] = useState({})
    const SearchItem = async(tradeId) => {
        const options = {
            abi: Barter,
            contractAddress: process.env.REACT_APP_BARTER,
            functionName: 'getTradeItem',
            params: {
              hash: tId,
            },
          }

          let data = await Moralis.executeFunction(options)
          console.log(data);
          try{
            if(data.hash!=0){
                setTradeobj(data);
            }else{
                setTradeobj({})
            }
          }
          catch{
            setTradeobj({})
          }
          
    }
  return (
    <div className='container mt-5'>
        <h1>Search trade</h1>
      <div class="input-group mb-3 mt-5">
        <input
          type="text"
          class="form-control"
          placeholder="Trade Hash"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={tId}
          onChange={(val)=>setTd(val.target.value)}
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={()=>SearchItem(tId)}
        >
          Search
        </button>
        
      </div>
          
          {
              tradeobj.isActive && (
                  <div>
                  <h1>hello</h1>
                  <NftList add={propTypes.add} tId={Number(tradeobj.tradeItemId)}/>
                  </div>
                  )
                  
          }
        
      
    </div>
  )
}

export default SearchTrade
