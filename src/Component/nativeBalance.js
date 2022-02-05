import { useNativeBalance } from "react-moralis";

function NativeBalance(props) {
    const {getBalances,error,data,balance } = useNativeBalance({  });
    return (
     
  
      <div>
        
          {error && <>{JSON.stringify(error)}</>}
          <button onClick={() => getBalances({ params: {address:props.add, decimals: 18 } })}>Refetch</button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default NativeBalance;