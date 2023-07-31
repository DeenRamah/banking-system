const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

let balance = 0;

app.use(express.json());
app.use(cors());

app.get('/api/balance', (req, res) => {
  res.json({ balance });
});

app.post('/api/deposit', (req, res) => {
  const { amount } = req.body;
  if (amount > 0) {
    balance += amount;
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid amount' });
  }
});

app.post('/api/withdraw', (req, res) => {
  const { amount } = req.body;
  if (amount > 0 && balance >= amount) {
    balance -= amount;
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid amount or insufficient balance' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
