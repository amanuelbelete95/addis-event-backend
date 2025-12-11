import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;


import { logInUser, registerUser } from './controllers/authController.js';
import { allEvents, createEvent, deleteEvent, getSingleEvent, updateEvent } from './controllers/eventController.js';


// Add user route
app.post('/api/register', registerUser);
app.post('./api/login', logInUser)


// Event Route
app.post('/api/events', createEvent);
// get All Events
app.get('/api/events', allEvents);
// get single event
app.get('/api/events/:event_id', getSingleEvent
);
// Update an event
app.put('/api/events/:event_id', updateEvent);
// delete event
app.delete('/api/events/:event_id', deleteEvent);

app.listen(PORT, () => {
  console.log('Sever has started');
});
