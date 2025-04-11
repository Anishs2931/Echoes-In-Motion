import React from 'react';
import { Link, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Body.css';

function Body() {
  const navigate = useNavigate();
  const goToExplore = () => {
    navigate('/explore')
  };

  const goToVideoStory = (id) => {
    alert(`Navigating to story with ID: ${id}`);
    // In a real app, you'd use React Router: navigate(`/story/${id}`)
  };

  const storyCards = [
    {
      id: 1,
      image: "https://t3.ftcdn.net/jpg/12/35/24/22/360_F_1235242259_qBB24My57OEoHk8MEY5JFfvHBATXOKuv.jpg",
      title: "Folk Tales from India",
      description: "Traditional stories from around India",
    },
    {
      id: 2,
      image: "https://images.aeonmedia.co/images/b4a4a8f6-d310-47d7-a22c-f9a1d0f46c90/essay-final-gettyimages-90009364.jpg?width=3840&quality=75&format=auto",
      title: "Folk Tales from Timeless Globes",
      description: "Stories that transcend time and space",
    },
    {
      id: 3,
      image: "https://talesofafrica.org/wp-content/uploads/2023/02/African-folktales.webp",
      title: "Folk Tales from Japan",
      description: "Ancient stories from the land of the rising sun",
    },
  ];

  return (
    <div className="body">
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
          <a href="/body">Home</a>
          <a href="/">My videos</a>
          <a href="/about">About</a>
          <a href="/help">Help</a>
        </nav>
      </div>

      <main className="main">
        <div className="explore-section">
          <div className="slideshow-container">
            <div className="slideshow">
              <img
                src="https://t3.ftcdn.net/jpg/12/35/24/22/360_F_1235242259_qBB24My57OEoHk8MEY5JFfvHBATXOKuv.jpg"
                alt="Slide 1"
                className="slide"
              />
              <img
                src="https://images.aeonmedia.co/images/b4a4a8f6-d310-47d7-a22c-f9a1d0f46c90/essay-final-gettyimages-90009364.jpg?width=3840&quality=75&format=auto"
                alt="Slide 2"
                className="slide"
              />
              <img
                src="https://talesofafrica.org/wp-content/uploads/2023/02/African-folktales.webp"
                alt="Slide 3"
                className="slide"
              />
            </div>
            <div className="slideshow-overlay">
              <div className="text-content">
                <h1 className='h'>Let's Explore The World with Us</h1>
                <button
                  onClick={goToExplore}
                  className="button me-5">Explore</button>
                <Link to="/generate">
                  <button className="button" style={{ fontFamily: "'Rye', sans-serif" }}>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Story Cards Section */}
        <div className="story-cards-container">
          {storyCards.map((card) => (
            <div
              key={card.id}
              className="story-card"
              onClick={() => goToVideoStory(card.id)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="story-card-image"
              />
              <div className="story-card-content">
                <h3 className="story-card-title">{card.title}</h3>
                <p className="story-card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Body;