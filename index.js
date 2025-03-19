import express from "express"
import cors from "cors"
import mongoose from "mongoose";


const app = express();
app.use(express.json());

app.use(cors())


app.get("/", (req, res) => {
    res.send("<h1>Hello from Node API Server Updated </h1>");
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