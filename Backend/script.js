import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import * as PlayHT from "playht";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import { exec } from "child_process";
import path from "path";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

PlayHT.init({
    userId: "EyJoksg5TWemisbhG2F0eECHixL2",
    apiKey: "7162715ee69b4380989612d7f3138f53",
});

let story = "";
let genre = "";
let language = "";
let region = "";
let characterDetails = "";
let setting = "";
let storyLength = "";
let narrative = "";
let audience = "";
let paragraphList = [];
let imageIndex = 0;


async function generateContent() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `${story}. Consider this story and make a narration. Consider ${
            genre || "any"
        } genre, making sure to include cultural nuances and local art styles of ${
            region || "any region"
        } in ${language || "English"}. Split the narration into various scenes, giving a one-line space for each scene. Don't add labels to scenes. 

        Character Details: ${characterDetails || "No character details provided"}
        Setting: ${setting || "No setting provided"}
        Story Length: ${storyLength || "Medium"} (e.g., short, medium, long).3-4 scenes for short,5-6 for medium and 9-10 for long.
        Narrative Perspective: ${narrative || "First-person"}
        Audience: ${audience || "General Audience"}`;

        const result = await model.generateContent(prompt);
        console.log(result);

        if (result?.response?.text) {
            const narration = await result.response.text();
            paragraphList = narration
                .trim()
                .split("\n")
                .filter((paragraph) => paragraph.trim() !== "");
        } else {
            console.error("Unexpected result structure:", result);
        }
    } catch (error) {
        console.error("Error generating content:", error);
    }
}


async function generateImages(prompts) {
    for (const prompt of prompts) {
        const payload = { prompt, output_format: "jpeg" };
        try {
            const response = await axios.post(
                `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
                axios.toFormData(payload, new FormData()),
                {
                    validateStatus: undefined,
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                        Accept: "image/*",
                    },
                }
            );

            if (response.status === 200) {
                const imageName = `image_${imageIndex}.jpeg`;
                fs.writeFileSync(`./${imageName}`, Buffer.from(response.data));
                console.log(`Image generated and saved as ${imageName}`);
                imageIndex += 1;
            } else {
                console.error(`Failed to generate image for prompt: ${prompt}`);
            }
        } catch (error) {
            console.error(`Error generating image for prompt: ${prompt}`, error);
        }
    }
}

async function streamAudio(text, index) {
    try {
        const stream = await PlayHT.stream(text, { voiceEngine: "PlayDialog" });

        const outputFileName = `output_${index}.mp3`;
        const writeStream = fs.createWriteStream(outputFileName);

        stream.on("data", (chunk) => writeStream.write(chunk));
        stream.on("end", () => {
            console.log(`Audio saved as ${outputFileName}`);
            writeStream.end();
        });
    } catch (error) {
        console.error("Error with PlayHT API:", error);
    }
}

async function generateAudioForParagraphs(paragraphList) {
    for (let i = 0; i < paragraphList.length; i++) {
        const paragraph = paragraphList[i];
        if (paragraph.trim()) await streamAudio(paragraph, i);
    }
}

async function createVideoForScenes(paragraphList) {
    const videoFiles = [];

    for (let i = 0; i < paragraphList.length; i++) {
        const image = `./image_${i}.jpeg`;
        const audio = `./output_${i}.mp3`;
        const outputVideo = `scene_${i}.mp4`;

        if (fs.existsSync(image) && fs.existsSync(audio)) {
            const command = `C:\\ffmpeg\\bin\\ffmpeg -loop 1 -framerate 1 -i ${image} -i ${audio} -c:v libx264 -tune stillimage -c:a aac -strict experimental -shortest ${outputVideo}`;
            try {
                await runCommand(command);
                console.log(`Video generated: ${outputVideo}`);
                videoFiles.push(outputVideo);
            } catch (error) {
                console.error(`Error generating video for scene ${i}:`, error);
            }
        } else {
            console.log(`Missing image or audio for scene ${i}`);
        }
    }

    if (videoFiles.length > 0) {
        const concatFile = "filelist.txt";
        fs.writeFileSync(
            concatFile,
            videoFiles.map((file) => `file '${path.resolve(file)}'`).join("\n")
        );

        const concatCommand = `C:\\ffmpeg\\bin\\ffmpeg -f concat -safe 0 -i ${concatFile} -c:v libx264 -c:a aac final_video.mp4`;
        try {
            await runCommand(concatCommand);
            console.log("Final video generated: final_video.mp4");
        } catch (error) {
            console.error("Error merging video files:", error);
        }
    }
}

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr || error.message}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function run({ inputStory, inputGenre, inputLanguage, inputRegion,  inputCharacterDetails, 
    inputSetting, inputStoryLength, inputNarrative,  inputAudience}) {
    story = inputStory;
    genre = inputGenre || "";
    language = inputLanguage || "";
    region = inputRegion || "";
    characterDetails=inputCharacterDetails || "";    
    setting= inputSetting || "";
    storyLength=inputStoryLength||"";
    narrative=inputNarrative||"";
    audience=inputAudience||"";

    try {
        await generateContent();
        await generateImages(paragraphList);
        await generateAudioForParagraphs(paragraphList);
        await createVideoForScenes(paragraphList);
        console.log("All processes completed successfully!");
    } catch (error) {
        console.error("Error during execution:", error);
    }
}

export { run };
