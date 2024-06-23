const request = require('supertest');

const app = require("../app")

describe('Fake Bank API', () => {

    const users = {
        'user1': { balance: 1000, transactions: [] },
        'user2': { balance: 500, transactions: [] },
        'user3': { balance: 1200, transactions: [] }
    };

    it('should transfer money between users', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ from: 'user1', to: 'user2', amount: 200 });

        expect(response.status).toBe(200);
        expect(response.body.fromBalance).toBe(800);
        expect(response.body.toBalance).toBe(700);
    });

    it('should return insufficient funds when balance is low', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ from: 'user2', to: 'user1', amount: 1000 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Insufficient funds');
    });

    it('should return user not found for invalid users', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ from: 'user1', to: 'nonexistent', amount: 100 });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return the correct balance for a user', async () => {
        const response = await request(app)
            .get('/balance/user1');

        expect(response.status).toBe(200);
        expect(response.body.balance).toBe(800);
    });

    it('should return user not found for invalid user balance check', async () => {
        const response = await request(app)
            .get('/balance/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return transactions for a user', async () => {
        const response = await request(app)
            .get('/transactions/user1');

        expect(response.status).toBe(200);
        expect(response.body.transactions.length).toEqual(1);
    });

    it('should return user not found for invalid user transactions check', async () => {
        const response = await request(app)
            .get('/transactions/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
});
