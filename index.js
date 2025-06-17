import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Event } from "./models/event.model.js";
import { createEvent, deleteEvent, getAllEvents, getSingleEvent, updateEvent } from "./routes/events.routes.js";
import { createUser } from "./routes/user.routes.js";


const app = express();
app.use(express.json());

app.use(cors())

// Handle User Model

app.post('/api/users/register', createUser)

// Handle Event Model
app.post('/api/events', createEvent)

app.get("/api/events", getAllEvents)

app.put('/api/events/:id', updateEvent)

app.get("/api/events/:id", getSingleEvent);

app.delete("/api/events/:id", deleteEvent);


// 


// connection string
const MONGODB_URI = "mongodb+srv://emmanuelbelete7:r5CSMiwn8YTD5Wd@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB"
const PORT = 4000;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => console.log("Connection Error", err))