import React, { useState, useEffect } from 'react'
import Barter from '../../contracts/Barter.json'
import TradeTile from './TradeTile'
import Moralis from 'moralis'
import PartTradeTile from './PartTradeTile'

const TradeScreen = () => {
  const options = {
    abi: Barter,
    contractAddress: process.env.REACT_APP_BARTER,
    functionName: 'getActiveTradesCreated',
  }
  const options1 = {
    abi: Barter,
    contractAddress: process.env.REACT_APP_BARTER,
    functionName: 'getActiveTradesParticipated',
  }
  const [trades, setTrade] = useState([])
  const [partTrade, setPartTrade] = useState([])
  useEffect(async () => {
    try{
      const data = await Moralis.executeFunction(options)
      setTrade(data)
    } catch(error){
      // console.log(console.error);
    }
    
    try {
      const partdata = await Moralis.executeFunction(options1)
      setPartTrade(partdata)
    } catch(error) {
      // console.log(error)
    }

  }, [])

  return (
    <div>
      <h1>Trade Screen</h1>

      <div className="container">
        <div>
          <h3>Trades Created</h3>
          {trades.length > 0 && trades.map((data) => <TradeTile data={data} />)}
        </div>

        <div>
          <h3>Trades Participating</h3>
          {partTrade.length > 0 && partTrade.map((data) => <PartTradeTile data={data} />)}
        </div>
      </div>
    </div>
  )
}

export default TradeScreen
