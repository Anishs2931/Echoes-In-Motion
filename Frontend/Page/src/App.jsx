import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Generate from './Generate'; // Import the Generate component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/generate" element={<Generate />} /> {/* Route should match "/generate" */}
      </Routes>
    </Router>
  );
}

export default App;
