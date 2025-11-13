import cors from "cors";
import express from "express";



const app = express();
app.use(cors())
app.use(express.json());
const PORT = 4000;

import pool from "./db.js"

// Add event
app.post('/api/events', async (req, res) => {
    try {
        const { name, location, event_date, event_status, description } = req.body
        const newEvent = await pool.query(
            `insert into event (name, location, event_date, event_status, description) 
             values ($1, $2, $3, $4,$5) RETURNING *`,
            [name, location, event_date, event_status, description]
        );
        res.json(newEvent.rows[0]);
    } catch (error) {

    }
})
// get All Events

app.get('/api/events', async (req, res) => {
    try {
        const allEvents = await pool.query(
            "SELECT * FROM event");
        res.json(allEvents.rows);
    } catch (error) {
    }
})

// get single event

app.get('/api/events/:event_id', async (req, res) => {

    try {
        const { event_id } = req.params;
        const getEvent = await pool.query(`SELECT * FROM event WHERE event_id=$1`, [event_id]);
        res.json(getEvent.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// Update an event

app.put('/api/events/:event_id', async (req, res) => {
    try {
        const { event_id } = req.params;
        const { name, location } = req.body;
        const updatedEvent = await pool.query(
        `
        UPDATE event 
        SET 
          name = COALESCE($1, name),
          location = COALESCE($2, location)
        WHERE event_id = $3
        RETURNING *
      `,
        [name, location, event_id]
        );
        res.json(updatedEvent.rows[0]);
    } catch (error) {

    }
})

app.delete('/api/events/:id', async (req, res) => {

})
app.listen(PORT, () => {
    console.log("Sever has started")
})
