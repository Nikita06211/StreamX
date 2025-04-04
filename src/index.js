import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: "./.env", 
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8002
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });
