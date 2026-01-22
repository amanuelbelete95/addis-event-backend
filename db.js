import { Pool } from 'pg'


const pool = new Pool({
    user: "postgres",
    password: "ab@admin-db",
    host: "localhost",
    port: 5432,
    database: "events"
})

pool.on('connect', () => {
    console.log('Database connected successfully');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

export default pool;