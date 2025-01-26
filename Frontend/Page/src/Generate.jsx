import React, { useState } from 'react';
import ReactDOM from 'react-dom'; 
import { Link } from 'react-router-dom';
import './Generate.css'
function Generate() {
  const [language, setLanguage] = useState('English');
  const [story, setStory] = useState('');
  const [characterDetails, setCharacterDetails] = useState('');
  const [setting, setSetting] = useState('');
  const [storyLength, setStoryLength] = useState('none');
  const [genre, setGenre] = useState('');
  const [region, setRegion] = useState('');
  const [narrative, setNarrative] = useState('');
  const [audience, setAudience] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState(''); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      story: story,
      genre: genre,
      language: language,
      region: region,
      characterDetails: characterDetails,
      setting: setting,
      storyLength: storyLength,
      narrative: narrative,
      audience: audience,
    };

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMessage("Story generated successfully!");
        setVideoUrl(result.videoUrl);
      } else {
        setResponseMessage("Failed to generate the story.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error during generation.");
    }
  };

  return (
    <div className="container">
      <div className="language-select">
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          style={{ marginTop: '1rem' }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="English-US">English-US</option>
          <option value="English-UK">English-UK</option>
          
        </select>
      </div>

      <div className="input-options">
        <button className="input-button microphone">🎤</button>
        <button className="input-button file-upload">📄</button>
        <input
          type="text"
          className="text-input"
          placeholder="Enter story"
        />
        <button className="submit-button">➡</button>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-group advanced-options">
          <h1>Advanced Options</h1>

          <label htmlFor="character-details">Character Details (Optional):</label>
          <textarea
            id="character-details"
            placeholder="Enter character details..."
            value={characterDetails}
            onChange={(e) => setCharacterDetails(e.target.value)}
          ></textarea>

          <label htmlFor="region">Region (Optional):</label>
          <input
            type="text"
            id="region"
            placeholder="Enter region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />

          <label htmlFor="setting">Setting and Atmosphere (Optional):</label>
          <textarea
            id="setting"
            placeholder="Enter setting and atmosphere..."
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
          ></textarea>

          <label htmlFor="story-length">Story Length (Optional, Approximate):</label>
          <select
            id="story-length"
            value={storyLength}
            onChange={(e) => setStoryLength(e.target.value)}
          >
            <option value="none">None</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>

          <label htmlFor="genre">Genre (Optional):</label>
          <input
            type="text"
            id="genre"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <label htmlFor="narrative">Narrative Perspective (Optional):</label>
          <input
            type="text"
            id="narrative"
            placeholder="Enter narrative perspective"
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
          />

          <label htmlFor="audience">Audience Age Group (Optional):</label>
          <input
            type="text"
            id="audience"
            placeholder="Enter audience age group"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <button type="submit">Generate Story</button>
      </form>

   
      <Link to="/">
            <button className="button" style={{ fontFamily: "'Rye', sans-serif" }}>
              Go Back
            </button>
      </Link>

      {responseMessage && <p>{responseMessage}</p>}

        {videoUrl && (
          <div>
            <h3>Generated Video:</h3>
            <video width="600" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
    </div>
  );
}

export default Generate;
