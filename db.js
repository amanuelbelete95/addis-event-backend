import { Pool } from 'pg'

const pool = new Pool({
     connectionString: process.env.DB_URL
})

pool.on('connect', () => {
    console.log('Database connected successfully');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

export default pool;