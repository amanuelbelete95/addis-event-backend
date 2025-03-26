    import cors from "cors";
    import express from "express";
    import mongoose from "mongoose";
    import { Event } from "./models/event.model.js";


    const app = express();
    app.use(express.json());

    app.use(cors())


    app.get("/", (req, res) => {
        res.send("<h1>Hello from Node API Server Updated </h1>");
    });

    // Get all events

    app.get("/api/events", async (req, res) => {
        try {
            const events = await Event.find({});
            res.status(200).json(events);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    // create an event 
    app.post('/api/events', async (req, res) => {
        try {
            const newEvent = new Event(req.body);
            await newEvent.save();
            res.status(200).json(newEvent);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })  
        }
    })

    // update an event

    app.put('/api/events/:id', async (req, res) => {
        try {
            const { id } = req.params
            const event = await Event.findByIdAndUpdate(id, req.body);
            if(!event) {
                return res.status(404).json({message: "event not found!"})
            }
            // Check if it has already updated the database
            const updateEvent = await Event.findById(id)
            res.status(200).json(updateEvent)

        } catch (error) {
            res.status(500).json({
                message: error.message
            })  
        }
    })



    // Get single events;

    app.get("/api/events/:id", async (req, res) => {
        try {
        const { id } = req.params
        const event = await Event.findById(id);
        res.status(200).json(event);
        } catch (error) {
        res.status(500).send(error.message);
        }
    });

     // Delete event
    app.delete = ("/api/events/:id", async (req, res) => {
        try {
        const { id } = req.params
        console.log(id)
        const event = await Event.findById(id);
        // await event.remove();
        res.status(200).json({message: "deleted the event"});
        } catch (error) {
        res.status(500).send(error.message);
        }
    })

    // connection string
    const MONGODB_URI = "mongodb+srv://emmanuelbelete7:r5CSMiwn8YTD5Wd@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB"
    // port running on the backend
    const PORT = 4000;

    // Connect to MongoDB
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("MongoDB Connected Successfully");
        app.listen(PORT, async () => {
            console.log(`Server running on port ${PORT}`); 
        });
    }).catch((err)=> console.log("Connection Error", err))