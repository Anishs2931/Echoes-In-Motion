import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function About() {
  return (
    <div className="about" style={{
    backgroundColor: '#eb9d8d',
    height:'100vh'
  }}>
      {/* Navbar */}
      <div className="header d-flex justify-content-between align-items-center p-2 bg-#755940b9 text-white">
        <div className="logo d-flex align-items-center">
          <img
            src={logo}
            alt="Echoes in Motion Logo"
            width="70px"
            className="me-2"
          />
          <p className="title m-0 fs-4">Echoes in Motion</p>
        </div>
        <nav className="nav">
          <Link to="/body" className="text-white text-decoration-none me-4">
            Home
          </Link>
          <Link to="/" className="text-white text-decoration-none me-4">
            My videos
          </Link>
          <Link to="/about" className="text-white text-decoration-none me-4">
            About
          </Link>
          <Link to="/help" className="text-white text-decoration-none">
            Help
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mt-5">
        {/* About Section */}
        <div className="about-section bg-light p-4 rounded shadow">
          <h1 className="text-center mb-4">About Us</h1>
          <p>
            Welcome to <strong>Echoes in Motion</strong>, a platform dedicated
            to preserving and sharing timeless tales from around the world. We
            believe in the power of storytelling to connect cultures, inspire
            creativity, and keep traditions alive.
          </p>
          <p>
            Our mission is to create a space where people of all ages can
            explore the rich tapestry of global folklore. From ancient myths to
            modern retellings, we bring you stories that transcend time and
            space.
          </p>
        </div>

        {/* Team Section */}
        <div className="team-section mt-3">
          <h1 className="text-center mb-4 text-light">Meet Our Team</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center shadow">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 1"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">John Doe</h5>
                  <p className="card-text">Founder & Storyteller</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 2"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Jane Smith</h5>
                  <p className="card-text">Creative Director</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member 3"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Alice Johnson</h5>
                  <p className="card-text">Content Curator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;