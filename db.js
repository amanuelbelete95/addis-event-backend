import { Pool } from 'pg'


const pool = new Pool({
    user: "postgres",
    password: "ab@admin-db",
    host: "localhost",
    port: 5432,
    database: "events"
})


export default pool;