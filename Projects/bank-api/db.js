const { Pool } = require("pg")

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bank-db',
    password: 'postgres',
    port: 5432,
});

const setupDatabase = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                username VARCHAR(50) PRIMARY KEY,
                balance NUMERIC
            );

            CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY,
                from_user VARCHAR(50),
                to_user VARCHAR(50),
                amount NUMERIC,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (from_user) REFERENCES users(username),
                FOREIGN KEY (to_user) REFERENCES users(username)
            );
        `);
    } finally {
        client.release();
    }
};


module.exports = { pool, setupDatabase }

