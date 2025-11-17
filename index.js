import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

import pool from './db.js';

// Add event
app.post('/api/events', async (req, res) => {
  try {
    const { name, location, event_date, event_status, description } = req.body;
    const newEvent = await pool.query(
      `insert into event (name,location,event_date,event_status,description)  
       values ($1, $2, $3, $4, $5)
       returning *
      `,
      [name, location, event_date, event_status, description]
    );
    res.json(newEvent.rows[0]);
  } catch (error) { }
});
// get All Events

app.get('/api/events', async (req, res) => {
  try {
    const allEvents = await pool.query(`select * from event`);
    res.json(allEvents.rows);
  } catch (error) { }
});

// get single event

app.get('/api/events/:event_id', async (req, res) => {
  try {
    const { event_id } = req.params;
    const getEvent = await pool.query(`select * from event where event_id = $1`,
      [event_id]
    );
    res.json(getEvent.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update an event

app.put('/api/events/:event_id', async (req, res) => {
  try {
    const { event_id } = req.params;
    const { name, location } = req.body;
    const updatedEvent = await pool.query(
      `
      update event set name = coalesce($1, name),location = coalesce($2, location)
      where event_id = $3
      returning
       *
      `,
      [name, location, event_id]
    );
    return res.json(updatedEvent.rows[0]);
  } catch (error) { }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const { event_id } = req.params;
    const deletedEvent = await pool.query(
      `
       delete from event 
       where event_id = $1
       returning
         *
      `,
      [event_id]
    );
    return res.json({ message: 'Event deleted succesfully', event: deletedEvent.rows[0] });
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ message: 'Server error', event: deletedEvent.rows[0] });
  }
});

app.listen(PORT, () => {
  console.log('Sever has started');
});
