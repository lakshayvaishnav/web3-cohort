import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

function App() {
  const [count, setCount] = useState(0);

  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  async function getBalance() {
    alert("fetching the balance");
    const balance = await client.getBalance({
      address: "0xD9722c11A9d2B1618Bb975ce185F2bf3b1342dd1",
    });
    console.log("the balalnce : 💲 ", balance);
  }

  return (
    <>
      <button onClick={getBalance}>get Balance</button>
    </>
  );
}

export default App;
