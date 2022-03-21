import "./App.css";
import { useState } from "react";

export function Stake({
  tokenData,
  provider,
  walletdata,
  requestAccount,
  _intializeContract,
  connectWallet,
}) {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [removeAmount, setRemoveAmount] = useState(0);
  const [error, setError] = useState({ status: false, message: "" });
  const [success, setSuccess] = useState({ status: false, message: "" });

  async function stakeToken(amount) {
    if (stakeAmount < 1) {
      setError({ status: true, message: "amount must be more than 0" });
      return;
    }
    setError({ status: false, message: "" });
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const contract = await _intializeContract(provider.getSigner());
      const transaction = await contract.createStake(stakeAmount);
      setStakeAmount(0);
      await transaction.wait();
    }
    setSuccess({ status: true, message: "Successfully Staked tokens" });
    connectWallet();
  }

  async function removeStake() {
    if (removeAmount < 1) {
      setError({ status: true, message: "amount must be more than 0" });
      return;
    }
    setError({ status: false, message: "" });
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const contract = await _intializeContract(provider.getSigner());
      const transaction = await contract.removeStake(removeAmount);
      await transaction.wait();
    }
    setSuccess({
      status: true,
      message: `Successfully Removed ${removeAmount} tokens`,
    });
    connectWallet();
  }
  async function claimRewards() {
    try {
      setError({ status: false, message: "" });
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const contract = await _intializeContract(provider.getSigner());
        const transaction = await contract.claimRewards();
        await transaction.wait();
        setSuccess({
          status: true,
          message: "Successfully claimed rewards",
        });
        await connectWallet();
      }
    } catch (err) {
      setError({ status: true, message: err.error.message });
    }
  }

  async function withdrawRewards() {
    try {
      setError({ status: false, message: "" });
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const contract = await _intializeContract(provider.getSigner());
        const transaction = await contract.withdrawReward();
        await transaction.wait();
        setSuccess({
          status: true,
          message: "Successfully withdrawn rewards",
        });
        await connectWallet();
      }
    } catch (err) {
      setError({ status: true, message: err.error.message });
    }
  }

  return (
    <>
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
      <h3>
        Your Total Stake: {walletdata.stake ? walletdata.stake : 0} Token(s)
      </h3>
      <h3>Stake Token</h3>
      <input
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Amount"
        type="number"
        value={stakeAmount}
      />
      <button onClick={stakeToken}>Stake Token</button>

      <br></br>
      <h3>Your Stake Rewards: {walletdata.rewards}</h3>
      <button onClick={claimRewards}>Claim New Rewards</button>

      <br></br>
      <h3>Withdraw Rewards</h3>
      <button onClick={withdrawRewards}>Withdraw Rewards</button>

      <br></br>
      <h3>Remove Your Stake</h3>
      <input
        onChange={(e) => setRemoveAmount(e.target.value)}
        placeholder="Amount"
        type="number"
        value={removeAmount}
      />
      <button onClick={removeStake}>Remove Stake</button>
      <br></br>
      <br></br>
    </>
  );
}
