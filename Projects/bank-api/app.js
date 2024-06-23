const express = require('express');
const bodyParser = require('body-parser');
const { transfer } = require("./util")

const app = express();
app.use(bodyParser.json());

// In-memory data structure to store user balances and transactions
const users = {
    'user1': { balance: 1000, transactions: [] },
    'user2': { balance: 500, transactions: [] },
    'user3': { balance: 1200, transactions: [] }
};

// Endpoint to transfer money from one user to another
app.post('/transfer', (req, res) => {

    const { from, to, amount } = req.body;

    // Validation
    if (!users[from] || !users[to]) {
        return res.status(404).send({ message: 'User not found' });
    }

    if (users[from].balance < amount) {
        return res.status(400).send({ message: 'Insufficient funds' });
    }

    const result = transfer(from, to, amount, users)

    return res.send(result);
});

// Endpoint to check a user's balance
app.get('/balance/:user', (req, res) => {
    const user = req.params.user;

    if (!users[user]) {
        return res.status(404).send({ message: 'User not found' });
    }

    return res.send({ balance: users[user].balance });
});

// Endpoint to get all transactions for a user
app.get('/transactions/:user', (req, res) => {
    const user = req.params.user;

    if (!users[user]) {
        return res.status(404).send({ message: 'User not found' });
    }

    return res.send({ transactions: users[user].transactions });
});

module.exports = app