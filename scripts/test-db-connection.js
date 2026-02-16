require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
    console.log('Testing connection to:', process.env.DATABASE_URL.replace(/:[^:]+@/, ':****@'));
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();
        console.log('✅ Success! Connected to database.');
        const res = await client.query('SELECT NOW()');
        console.log('Server time:', res.rows[0].now);
        await client.end();
    } catch (err) {
        console.error('❌ Connection failed!');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        if (err.code) console.error('Error code:', err.code);
    }
}

testConnection();
