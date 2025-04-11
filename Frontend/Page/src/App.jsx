import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './Body'; // Ensure this file exists
import Generate from './Generate'; // Ensure this file exists
import Landing from './Landing';
import { ClerkProvider } from '@clerk/clerk-react';
import About from './About';
import Help from './Help';
import Explore from './Explore';
import VideoPlayer from './VideoPlayer';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/body" element={<Body />} />
          <Route path="/generate" element={<Generate />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path="/explore" element={<Explore />} />
          <Route path="/stories/video" element={<VideoPlayer />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;