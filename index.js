import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import eventRoutes from "./routes/events.routes"


const app = express();
app.use(express.json());

app.use(cors())

// Handle User Model

// Handle Event Model

app.use('/api/events', eventRoutes )


// connection string
const MONGODB_URI = "mongodb+srv://emmanuelbelete7:r5CSMiwn8YTD5Wd@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB"
const PORT = 4000;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => console.log("Connection Error", err))