import React,{useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useWeb3Contract } from "react-moralis"
import NFTABI from "../contracts/NFT.json"
import Moralis from "moralis";
import { ParamType } from "ethers/lib/utils";

const CreateNFT = (props) => {
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

    const [fileUrl, setFileUrl] = useState(null)
    console.log(fileUrl)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    
    
  
    async function onChange(e) {
      const file = e.target.files[0]
      try {
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url)
        
      } catch (error) {
        console.log('Error uploading file: ', error)
      }  
    }

     const options = {
            abi:NFTABI,
            contractAddress: process.env.REACT_APP_NFT,
            functionName: "createToken",
          }
     
    const createNFT = async(url) => {
        console.log(url);
        let params = {
            params:{
                tokenURI:url
            }
            
        }
        let data = {...options,...params};
        console.log(data)
        await Moralis.executeFunction(data);
        // console.log(error)
        console.log("nft created")
    }
     return (
        <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={()=> createNFT(fileUrl)} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
        {/* {contractResponse && JSON.stringify(contractResponse)} */}
      </div>
    </div>
    )
}

export default CreateNFT;