const { transfer } = require("../util")

describe("transfer function", () => {

    // Arrange
    const users = {
        'user1': { balance: 1000, transactions: [] },
        'user2': { balance: 500, transactions: [] },
        'user3': { balance: 1200, transactions: [] }
    };

    /// Act
    const result = transfer('user1', 'user2', 1000, users)

    test("does update the balance", () => {

        /// Assert
        expect(users['user1'].balance).toBe(0)
        expect(users['user2'].balance).toBe(1500)
    })
    test("records a transaction", () => {
        expect(users['user1'].transactions.length).toBe(1)
        expect(users['user2'].transactions.length).toBe(1)
    })
    test("record transaction is correct", () => {
        user1Transaction = users['user1'].transactions[0]
        user2Transaction = users['user2'].transactions[0]
        expect(user1Transaction.amount).toBe(1000)
        expect(user1Transaction.from).toBe("user1")
        expect(user1Transaction.to).toBe("user2")

        expect(user2Transaction.amount).toBe(1000)
        expect(user2Transaction.from).toBe("user1")
        expect(user2Transaction.to).toBe("user2")
    })
    test("returns correct message", () => {

        expect(result.message).toBe('Transfer successful')
        expect(result.fromBalance).toBe(0)
        expect(result.toBalance).toBe(1500)
    })
})