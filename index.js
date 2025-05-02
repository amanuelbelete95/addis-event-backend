import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Event } from "./models/event.model.js";


const app = express();
app.use(express.json());

app.use(cors())


// Create Event
app.post('/api/events', async (req, res) => {
    const getNewEvent = req.body;
    if (!getNewEvent) {
        return res.status(404).json({
            message: "No Event is found to be created!"
        })
    }
    try {
        const newEvent = new Event(getNewEvent);
        await newEvent.save();
        res.status(200).json({
            success: true, data: newEvent, message: "Event Created Successfully"
        });
    } catch (error) {
        console.log("Error in Creating Event", error.message);
        res.status(500).json({
            success: false, message: "Server Error"
        })
    }
})

// Get Events

app.get("/api/events", async (req, res) => {
    const events = await Event.find({});
    if (!events) {
        return res.status(404).json({
            message: "Events Not Found!"
        })
    }
    try {
        res.status(200).json({
            success: true,
            data: events,
            message: events.length > 0 ? 'Events' : "No Events"
        });
    } catch (error) {
        console.log("Error in Getting Products", error.message)
        res.status(500).json({
            success: false, message: "Server Error"
        })
    }
})

// Update Event

app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params
    const getNewUpdatedEvent = req.body;
    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({ message: "Event not found to be updated!" })
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, getNewUpdatedEvent, { new: true })
        res.status(200).json(updatedEvent)
    } catch (error) {
        console.log("Error in Updating Product", error.message)
        res.status(500).json({
            message: error.message
        })
    }
})

// Get Single Event
app.get("/api/events/:id", async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({ message: "Event is not found" })
    }

    try {
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete("/api/events/:id", async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({ status: false, message: "Event not found to be deleted" });
    }
    try {
        await Event.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "Event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the event", error: error.message });
    }
});


// connection string
const MONGODB_URI = "mongodb+srv://emmanuelbelete7:r5CSMiwn8YTD5Wd@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB"
const PORT = 4000;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => console.log("Connection Error", err))