import "./App.css";
import { base, mainnet } from "viem/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { http } from "viem";
import {
  createConfig,
  useAccount,
  useBalance,
  useConnect,
  useSendTransaction,
  useTransaction,
  WagmiProvider,
} from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SenderAlreadyConstructedError } from "viem/account-abstraction";

// export const config = createConfig({
//   chains: [mainnet, base],
//   connectors: [injected(), metaMask(), safe()],
//   transports: {
//     [mainnet.id]: http(),
//     [base.id]: http(),
//   },
// });

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <SendEth />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  );

  function MyAddress() {
    const { address } = useAccount();
    const balance = useBalance({ address });
    return (
      <div>
        <div>Address : {address}</div>
        <br />
        <div>Balance : {balance?.data?.value}</div>
      </div>
    );
  }

  function WalletConnector() {
    // connectors is the array of wallets.
    const { connectors, connect } = useConnect();
    return connectors.map((connector) => (
      <button key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
      </button>
    ));
  }

  function SendEth() {
    const { data: hash, sendTransaction } = useSendTransaction();
    function transaction() {
      console.log("transaction cliecked");
      sendTransaction({
        to: document.getElementById("address").value,
        value: "100000000000000000", // 17 0s = 0.1 eth
      });
    }

    return (
      <div>
        {" "}
        <input id="address" type="text" placeholder="address " />
        <button onClick={transaction}>Send 0.1 ETH</button>
      </div>
    );
  }
}

export default App;
