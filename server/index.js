import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes for MongoDB
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// Chatbot route
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

// Function to run chat with the AI model
async function runChat(userInput) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    };

    const chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Zen's Role:\nZen is a compassionate, empathetic virtual therapist in the hope app. ...",
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error('Error in runChat:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}

// Chat route to interact with the chatbot
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("Incoming /chat request:", userInput);

    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({
      error: "Internal Server Error. If this persists, please contact support.",
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to server");
});

// MongoDB Connection and Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
  )
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
