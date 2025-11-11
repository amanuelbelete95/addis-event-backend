import cors from "cors";
import express from "express";

const app = express();
app.use(cors())
app.use(express.json());
const PORT = 5000;

// app.use('/api/events', eventRoutes )


// // // connection string
// // const MONGODB_URI = "mongodb+srv://emmanuelbelete7:r5CSMiwn8YTD5Wd@addisbackend-db.zukjs.mongodb.net/?retryWrites=true&w=majority&appName=AddisBackend-DB"
// // 
// // mongoose.connect(MONGODB_URI).then(() => {
// //     console.log("MongoDB Connected Successfully");
// //     app.listen(PORT, async () => {
// //         console.log(`Server running on port ${PORT}`);
// //     });
// // }).catch((err) => console.log("Connection Error", err))

app.listen(PORT, () => {
    console.log("Sever has started")
})
