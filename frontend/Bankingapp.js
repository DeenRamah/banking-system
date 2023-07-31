import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BankingApp = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Fetch initial balance from the server
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      await axios.post('/api/deposit', { amount });
      fetchBalance();
      setAmount(0);
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post('/api/withdraw', { amount });
      fetchBalance();
      setAmount(0);
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  return (
    <div>
      <h1>Banking System</h1>
      <h2>Account Balance: ${balance}</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default BankingApp;
