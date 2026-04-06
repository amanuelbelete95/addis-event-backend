import { Pool } from 'pg'


// const pool = new Pool({
//     user: "postgres",
//     password: "ab@admin-db",
//     host: "localhost",
//     port: 5432,
//     database: "events",
// })
const pool = new Pool({
     connectionString: "postgresql://postgres:ab%40admin-db@localhost:5432/events"
    // connectionString: "postgresql://postgres:AUTiZalPOpVLLXWGMcQDLEquoLtaEHst@postgres.railway.internal:5432/railway"

})

pool.on('connect', () => {
    console.log('Database connected successfully');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

export default pool;