const transfer = (from, to, amount, users) => {

    // Update balances
    users[from].balance -= amount;
    users[to].balance += amount;

    // Record the transaction
    const transaction = { from, to, amount, date: new Date().toISOString() };
    users[from].transactions.push(transaction);
    users[to].transactions.push(transaction);

    return { message: 'Transfer successful', fromBalance: users[from].balance, toBalance: users[to].balance }
}

module.exports = { transfer }