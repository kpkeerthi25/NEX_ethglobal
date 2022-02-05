import { useERC20Balances } from "react-moralis";



const ERC20Balances = (props) => {
const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances();
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: {address:props.add} })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ERC20Balances;