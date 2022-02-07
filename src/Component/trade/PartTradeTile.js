import React from 'react'
import img from './logo192.png'
import { useNFTBalances } from 'react-moralis'
import Barter from '../../contracts/Barter.json'
import Moralis from 'moralis'

const PartTradeTile = (props) => {
    const ApproveNFT = async() => {
        const options = {
            abi:Barter,
            contractAddress: process.env.REACT_APP_BARTER,
            functionName: "approveNft",
            params:{
                tradeItemId:Number(props.data.tradeItemId),
                nftNo:Number(props.data.item1.NftItemId)
            }
          }
          const res = await Moralis.executeFunction(options);
          console.log(res);
    }

  return (
    <div>
      <div
        className="row shadow p-3 mb-5 bg-white rounded"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: '15px',
        }}
      >
        {props.data.item2.tokenURI.length != 0 && (
          <div
            style={{
              display: 'flex',
              width: '50%',
              paddingLeft: '10%',
              paddingRight: '5%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                src={props.data.item2.tokenURI}
                className="rounded mt-4"
                width="150"
                height="150"
              />
              <p>{props.data.item2.nftContract}</p>
              <h3 style={{ marginLeft: '10px' }}>
                #{props.data.item2.tokenId.toString()}
              </h3>
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              >
                <button style={{ margin: ' 0 auto' }}>Remove </button>
              </div>
            </div>
          </div>
        )}
        {props.data.item2.tokenURI.length == 0 && (
          <div
            style={{
              display: 'flex',
              width: '50%',
              paddingLeft: '15%',
              paddingRight: '5%',
            }}
          >
            <h3 style={{ alignSelf: 'center', marginLeft: '10px' }}>
              No Item added
            </h3>
          </div>
        )}
        {props.data.item1.tokenURI.length != 0 && (
          <div
            style={{
              display: 'flex',
              width: '50%',
              paddingLeft: '10%',
              paddingRight: '5%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                src={props.data.item1.tokenURI}
                className="rounded mt-4"
                width="150"
                height="150"
              />
              <p>{props.data.item1.nftContract}</p>
              <h3 style={{ marginLeft: '10px' }}>
                #{props.data.item1.tokenId.toString()}
              </h3>
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              >
                  {console.log(props.data.item1.isApproved)}
                {!props.data.item1.isApprovedByTrader &&<button onClick={()=>ApproveNFT()} style={{ margin: ' 0 auto' }}>Approve </button>}
                {props.data.item1.isApprovedByTrader && <p>Approved!!!</p>}
              </div>
            </div>
          </div>
        )}
        {props.data.item1.tokenURI.length == 0 && (
          <div
            style={{
              display: 'flex',
              width: '50%',
              paddingLeft: '15%',
              paddingRight: '5%',
            }}
          >
            <h3 style={{ alignSelf: 'center', marginLeft: '10px' }}>
              No Item added
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default PartTradeTile
