import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, marker } = location.state || {};

  if (!videoUrl) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">
          <h3>No video selected</h3>
          <p>Please select a country from the globe to watch its stories.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/explore')}
          >
            Go to Globe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div 
          className="card-header" 
          style={{ backgroundColor: marker?.color || '#007bff', color: 'white' }}
        >
          <h1>{marker?.name || 'Cultural Stories'}</h1>
          <p className="mb-0">{marker?.description}</p>
        </div>
        <div className="card-body">
          <div className="ratio ratio-16x9 mt-4">
            <video controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/explore')}
            >
              Back to Globe
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;