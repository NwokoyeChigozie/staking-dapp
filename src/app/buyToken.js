import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

export function BuyToken({
  tokenData,
  provider,
  requestAccount,
  _intializeContract,
  connectWallet,
}) {
  const [buyAmount, setBuyAmount] = useState(0);
  const [buyAmountPrice, setBuyAmountPrice] = useState(0);
  const [error, setError] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });
  async function buyToken() {
    if (buyAmount < 10) {
      setError({ status: true, message: "amount too small" });
      return;
    }
    setError({ status: false, message: "" });
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const contract = await _intializeContract(provider.getSigner());
      const options = { value: ethers.utils.parseEther(`${buyAmountPrice}`) };
      const transaction = await contract.buyToken(options);
      await transaction.wait();
    }
    setSuccess({ status: true, message: "Successfully Bought tokens" });
    connectWallet();
  }

  async function setTokenBuyData(amount) {
    setBuyAmount(amount);
    let etherPrice = (amount * 1) / tokenData.tokenPricePerEther;
    setBuyAmountPrice(etherPrice);
  }

  return (
    <>
      <br></br>
      <h3>Buy Token</h3>
      <input
        onChange={(e) => setTokenBuyData(e.target.value)}
        placeholder="Amount"
        type="number"
        value={buyAmount}
      />
      <p>Price for tokens in Ether: {buyAmountPrice} Ether(s)</p>
      <button onClick={buyToken}>Buy Token</button>
      {error.status ? (
        <h3 style={{ backgroundColor: "red" }}>{error.message}</h3>
      ) : (
        ""
      )}
      {success.status ? (
        <h3 style={{ backgroundColor: "green" }}>{success.message}</h3>
      ) : (
        ""
      )}
    </>
  );
}
