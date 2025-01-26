import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './App.css';

function Body() {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <img
            src={logo}
            alt="Echoes in Motion Logo"
            width="70px"
            style={{ padding: '10px' }}
          />
          <p className="title">Echoes in Motion</p>
        </div>
        <nav className="nav">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/help">Help</a>
        </nav>
      </div>
      <main className="main">
        <div className="content">
          <h2>Bringing Timeless Tales to Life</h2>
          <Link to="/generate"> {/* Navigate to "/generate" */}
            <button className="button" style={{ fontFamily: "'Rye', sans-serif" }}>
              Get Started
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Body;
