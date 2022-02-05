import { checkProperties } from "ethers/lib/utils";
import { useNFTBalances } from "react-moralis";



const NFTBalances = (props) => {
const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => {getNFTBalances({ params: { chain: "avalanche testnet", address:props.add } })}} disabled={isLoading}>Refetch NFTBalances</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default NFTBalances;