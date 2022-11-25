import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./style.css";
import { ABI, ADDRESS } from "../../data";

import mintPng from "../../assets/mint.png";
import connectingPng from "../../assets/connecting.png";
import connectPng from "../../assets/connect.png";

export const Home = () => {
  const [number, setNumber] = useState<number>(0);
  const [connect, setConnect] = useState<boolean>(false);
  const [mint, setMint] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      if (connect) {
        setConnect(false);
      }
    }, 3000);
  }, [connect]);
  useEffect(() => {
    setTimeout(() => {
      if (mint) {
        setMint(false);
      }
    }, 3000);
  }, [mint]);

  const green = "#47ff4a";

  let contract: any;
  let account: string;

  const handleConnectToWallet = async () => {
    if (connect === true) return;
    setConnect(true);

    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log(accounts[0]);
        setWalletAddress(account);

        contract = new web3.eth.Contract(ABI, ADDRESS);
      }
    } catch (e) {
      console.log("error:", e);
    }
  };
  const handleMint = async () => {
    if (mint === true) return;
    setMint(true);

    if (!walletAddress) {
      alert("connect to wallet first");
      return;
    }
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(ABI, ADDRESS);
        const mintRate = Number(await contract.methods.cost().call());
        const totalAmount = mintRate * number;
        console.log(walletAddress, number, totalAmount);
        contract.methods
          .mint(walletAddress, number)
          .send({ from: walletAddress, value: String(totalAmount) });
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <div className="home-main">
      <div className="home-form">
        <h3>
          Connect to your wallet <br /> and start minting NFTs
        </h3>
        <input
          type="text"
          disabled
          placeholder="Wallet address"
          value={walletAddress}
        />
        <button
          style={{
            backgroundColor: connect ? green : "#c0e0ff",
            color: "#182848",
          }}
          onClick={handleConnectToWallet}
        >
          <p
            style={{
              transform: connect ? "translateY(0)" : "translateY(-100%)",
            }}
          >
            Connecting... <img src={connectingPng} alt="connecting" />
          </p>
          <p
            style={{
              transform: !connect ? "translateY(0)" : "translateY(100%)",
            }}
          >
            Connect wallet
            <img src={connectPng} alt="connect" />
          </p>
        </button>
        <input
          type="number"
          placeholder="No. of NFTs"
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <input type="text" disabled value="Price of each NFT is 0.13 ETH" />
        <button
          style={{
            backgroundColor: mint ? green : "#182848",
            color: "#fff",
          }}
          onClick={handleMint}
        >
          <p
            style={{
              transform: mint ? "translateY(0)" : "translateY(-100%)",
              color: "#182848",
            }}
          >
            Minting...
            <img src={connectingPng} alt="minting" />
          </p>
          <p
            style={{
              transform: !mint ? "translateY(0)" : "translateY(100%)",
            }}
          >
            Mint
            <img src={mintPng} alt="mint" />
          </p>
        </button>
      </div>
    </div>
  );
};
