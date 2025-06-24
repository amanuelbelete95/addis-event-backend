

import express from "express";
import { dbPromise } from './database.js';
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors())

const PORT = 4000;

const setUp = async () => {
  try {
    await dbPromise;
    console.log('Database is connected successfull');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error(err)
  }
}

setUp();