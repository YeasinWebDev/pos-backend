import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRoute } from "./modules/user/user.routes";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/auth', userRoute)

async function server() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server is running on port 5000"));
  } catch (error) {
    console.log(error, "Failed to connect to MongoDB");
  }
}

server();