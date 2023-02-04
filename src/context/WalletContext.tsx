import React, { createContext, useState } from "react";
import { ethers, Signer } from "ethers";

interface IWalletContext {
  connectWallet: () => Promise<void>;
  disConnecetWallet: () => void;
  walletAddress: string;
  Signer: Signer | null;
}
declare global {
  interface Window {
    ethereum: any;
  }
}
export const WalletContext = createContext<IWalletContext>(null!);

function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [Signer, setSigner] = useState<Signer | null>(null);

  const connectWallet = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setWalletAddress(await signer.getAddress());
    } else {
      alert("Please install Wallet to continue");
    }
  };

  const disConnecetWallet = () => {
    setSigner(null);
    setWalletAddress("");
  };

  return (
    <WalletContext.Provider
      value={{ connectWallet, disConnecetWallet, walletAddress, Signer }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export default WalletContextProvider;
