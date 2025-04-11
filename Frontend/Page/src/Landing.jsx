import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { SignIn, SignUp } from '@clerk/clerk-react';

function Landing() {
  const { isSignedIn,isLoaded } = useAuth();
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState(null); // State to track which form to show
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/body');
    }
  }, [isSignedIn, isLoaded, navigate]);


  return (
    <div className="landing-container">
      <video autoPlay muted loop className="background-video">
        <source src="bgvideo2.mp4" type="video/mp4" />
      </video>

      {/* Buttons Section */}
      <div className="auth-buttons d-flex justify-content-between">
        <div>
        <button
          onClick={() => setShowAuthForm('signin')}>Sign In
        </button>
        </div>
        <div>
        <button onClick={() => setShowAuthForm('signup')}>Sign Up</button>
        </div>
      </div>

      {/* Form Section */}
      <div className="auth-form">
        {showAuthForm === 'signin' && (
          <div>
            <SignIn />
          </div>
        )}
        {showAuthForm === 'signup' && (
          <div>
            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;