const express = require('express');
const bodyParser = require('body-parser');
const { transfer } = require("./util");
const { pool } = require('./db')



const app = express();
app.use(bodyParser.json());

// // Call the function to set up the database
// setupDatabase();

// Endpoint to transfer money from one user to another
app.post('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;

    const client = await pool.connect();
    try {
        // Validation
        const fromUser = await client.query('SELECT balance FROM users WHERE username = $1', [from]);
        const toUser = await client.query('SELECT balance FROM users WHERE username = $1', [to]);

        if (fromUser.rows.length === 0 || toUser.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (fromUser.rows[0].balance < amount) {
            return res.status(400).send({ message: 'Insufficient funds' });
        }

        // Perform the transfer
        await client.query('BEGIN');
        await client.query('UPDATE users SET balance = balance - $1 WHERE username = $2', [amount, from]);
        await client.query('UPDATE users SET balance = balance + $1 WHERE username = $2', [amount, to]);
        await client.query('INSERT INTO transactions (from_user, to_user, amount) VALUES ($1, $2, $3)', [from, to, amount]);
        await client.query('COMMIT');

        return res.send({ message: 'Transfer successful' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error in transaction', error.stack);
        return res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Endpoint to check a user's balance
app.get('/balance/:user', async (req, res) => {
    const user = req.params.user;

    const client = await pool.connect();
    try {
        const result = await client.query('SELECT balance FROM users WHERE username = $1', [user]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ balance: result.rows[0].balance });
    } finally {
        client.release();
    }
});

// Endpoint to get all transactions for a user
app.get('/transactions/:user', async (req, res) => {
    const user = req.params.user;

    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM transactions WHERE from_user = $1 OR to_user = $1', [user]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({ transactions: result.rows });
    } finally {
        client.release();
    }
});

module.exports = app;
