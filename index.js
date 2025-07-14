import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Allow all origins (or restrict below)

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());

app.post("/generate-blog", async (req, res) => {
  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const title = req.body.message;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Specify the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${title}`;
    console.log("Prompt:", prompt);

    // Generate content using the prompt
    const result = await model.generateContent([prompt]);

    // Get AI response text
    const generatedText = await result.response.text();
    console.log("Generated Blog:", generatedText);

    // Send the generated text as a response
    res.status(200).json({
      message: "Success",
      generatedText: generatedText,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Failed to generate content",
      error: error.message,
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server connected at http://localhost:3000");
});





// import OpenAI from "openai"


// const client = new OpenAI({
//     apiKey: OPENAI_API_KEY, // This is the default and can be omitted
//   });
  
//   async function main() {
//     const chatCompletion = await client.chat.completions.create({
//       messages: [{ role: 'user', content: 'Say this is a test' }],
//       model: 'gpt-3.5-turbo',
//     });
//     //console.log(chatCompletion);
//   }
  
//   main();
