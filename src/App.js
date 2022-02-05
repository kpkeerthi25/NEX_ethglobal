import React,{useEffect} from "react";
import { useMoralis } from "react-moralis";
import Moralis from 'moralis'
import ERC20Balances from "./Component/balance";
import NativeBalance from "./Component/nativeBalance";
import NFTBalances from "./Component/nftBalances";
import Home from "./Component/Home"

function App() {
  const { authenticate, isAuthenticated, user, logout} = useMoralis();

  // if (!isAuthenticated) {
  //   return (
  //     <div>
  //       <button onClick={() => {
  //         authenticate();
  //       // Moralis.enableWeb3();
        
  //     }
  //         }>Authenticate</button>
  //     </div>
  //   );
  // }

  /* <h1>Welcome {user.get("ethAddress") }</h1>
      <ERC20Balances add={user.get("ethAddress")}/>
      <NativeBalance add={user.get("ethAddress")}/>
      <NFTBalances add={user.get("ethAddress")}/>
      <button onClick={()=>{logout()}}> logout </button> */


  return (
    
      
      
      // <h1>Hello world</h1>
      <Home/>
      
  );
}

export default App;
