import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { run } from "./script.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/generate", async (req, res) => {
  const {
    story, 
    genre, 
    language, 
    region, 
    characterDetails, 
    setting, 
    storyLength, 
    narrative, 
    audience 
  } = req.body;

  try {
    await run({
      inputStory: story,
      inputGenre: genre,
      inputLanguage: language,
      inputRegion: region,
      inputCharacterDetails: characterDetails,
      inputSetting: setting,
      inputStoryLength: storyLength,
      inputNarrative: narrative,
      inputAudience: audience,
    });
    res.json({ success: true, message: "Content generated successfully!" });
  } catch (error) {
    console.error("Error during generation:", error);
    res.status(500).json({ success: false, message: "Error during generation" });
  }
});

app.get("/final-video", (req, res) => {
  const finalVideoPath = path.resolve("final_video.mp4");

  if (fs.existsSync(finalVideoPath)) {
    res.sendFile(finalVideoPath);
  } else {
    res.status(404).json({ success: false, message: "Final video not found" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
