import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect, useCallback } from "react";
import TokenArtifact from "../artifacts/contracts/GregToken.sol/GregToken.json";
import { BuyToken } from "./buyToken";
import { Stake } from "./stake";
const tokenAddress = "0x69Ddf36EF1844172aC178445f41d8123A0660457";
const provider = new ethers.providers.Web3Provider(window.ethereum);
function App() {
  const [tokenData, setTokenData] = useState({});
  const [connectionState, setConnectionState] = useState(false);
  const [walletdata, setwalletdata] = useState({});
  const [connectButton, setconnectButton] = useState("");
  // const [provider, setprovider] = useState(providerS);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function _intializeContract(init) {
    const contract = new ethers.Contract(tokenAddress, TokenArtifact.abi, init);
    return contract;
  }

  async function disconnectWallet() {
    // setprovider("");
    setConnectionState(false);
  }

  // async function connectWallet1() {
  //   let connected = window.ethereum.isConnected();
  //   if (!connectionState && connected) {
  //     await window.ethereum.request({
  //       method: "wallet_requestPermissions",
  //       params: [
  //         {
  //           eth_accounts: {},
  //         },
  //       ],
  //     });
  //     setConnectionState(true);
  //     return;
  //   }
  //   if (typeof window.ethereum !== "undefined") {
  //     const contract = await _intializeContract(provider);
  //     const [account] = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const Bigbalance = await contract.balanceOf(account);
  //     const stake = await contract.stakeOf(account);
  //     const rewards = await contract.rewardOf(account);
  //     let strBalance = Bigbalance.toString();
  //     let balance = strBalance / 10 ** 18;
  //     setwalletdata({
  //       contract: contract,
  //       account: account,
  //       balance: balance.toString(),
  //       stake: stake.toString(),
  //       rewards: rewards.toString(),
  //     });
  //     setConnectionState(true);
  //     return;
  //   }
  // }

  const connectWallet = useCallback(async () => {
    // setprovider(new ethers.providers.Web3Provider(window.ethereum));
    let connected = window.ethereum.isConnected();
    if (!connectionState && connected) {
      (async () =>
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        }))();
      setConnectionState(true);
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      const contract = await _intializeContract(provider);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const Bigbalance = await contract.balanceOf(account);
      const stake = await contract.stakeOf(account);
      const rewards = await contract.rewardOf(account);
      let strBalance = Bigbalance.toString();
      let balance = strBalance / 10 ** 18;
      setwalletdata({
        contract: contract,
        account: account,
        balance: balance.toString(),
        stake: stake.toString(),
        rewards: rewards.toString(),
      });
      setConnectionState(true);
      return;
    }
  }, [connectionState]);

  useEffect(() => {
    async function _getTokenData() {
      const contract = await _intializeContract(provider);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const tokenPricePerEther = await contract.tokenPricePerEther();
      const tokenData = {
        name: name,
        symbol: symbol,
        tokenPricePerEther: tokenPricePerEther.toString(),
      };
      setTokenData(tokenData);
    }
    _getTokenData();

    // let connected = window.ethereum.isConnected();
    if (connectionState === true) {
      connectWallet();
      setconnectButton(
        <h3>
          connected with: ({walletdata.account}){" "}
          <button onClick={disconnectWallet}>disconnect</button>
        </h3>
      );
    } else {
      setConnectionState(false);
      setconnectButton(<ConnectButton connectWallet={connectWallet} />);
    }
  }, [tokenData, connectionState, walletdata.account, connectWallet]);

  return (
    <div className="App">
      <h2>
        Token Name: {tokenData.name} (symbol: {tokenData.symbol})
      </h2>
      <h3>Price: 1 Ether = {tokenData.tokenPricePerEther}</h3>
      {connectButton}
      <br></br>
      <h3>Your Balance is: {walletdata.balance} Token(s)</h3>
      <BuyToken
        tokenData={tokenData}
        provider={provider}
        requestAccount={requestAccount}
        setwalletdata={setwalletdata}
        _intializeContract={_intializeContract}
        connectWallet={connectWallet}
      />
      <br></br>
      <br></br>
      <Stake
        tokenData={tokenData}
        provider={provider}
        requestAccount={requestAccount}
        setwalletdata={setwalletdata}
        walletdata={walletdata}
        _intializeContract={_intializeContract}
        connectWallet={connectWallet}
      />
    </div>
  );
}

function ConnectButton({ connectWallet }) {
  return <button onClick={connectWallet}>Connect Your Wallet</button>;
}

export default App;
