import React, { useEffect, useState } from "react";
import "./style.css";

import mintPng from "../../assets/mint.png";
import connectingPng from "../../assets/connecting.png";
import connectPng from "../../assets/connect.png";

export const Home = () => {
  const [number, setNumber] = useState<number>(0);
  const [connect, setConnect] = useState<boolean>(false);
  const [mint, setMint] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (connect) {
        setConnect(false);
      }
      if (mint) {
        setMint(false);
      }
    }, 3000);
  }, [connect, mint]);

  const green = "#47ff4a";

  const handleConnectToWallet = async () => {
    if (connect === true) return;
    setConnect(true);
  };
  const handleMint = async () => {
    if (mint === true) return;
    setMint(true);
  };

  return (
    <div className="home-main">
      <div className="home-form">
        <h3>
          Connect to your wallet <br /> and start minting NFTs
        </h3>
        <input type="text" disabled value="Your wallet address" />
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
