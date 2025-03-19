import express from "express"
import cors from "cors"
import mongoose from "mongoose";


const app = express();
app.use(express.json());

app.use(cors())


app.get("/", (req, res) => {
    res.send("<h1>Hello from Node API Server Updated </h1>");
})


app.listen(4000, () => {
    console.log("Server is running")
})
 
mongoose.connect('mongodb+srv://emmanuelbelete7:<r5CSMiwn8YTD5Wd>@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB')


