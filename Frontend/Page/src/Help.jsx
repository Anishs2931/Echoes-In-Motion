import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function Help() {
  return (
    <div className="help" style={{backgroundColor:'#eb9d8d'}}>
      {/* Navbar */}
      <div className="header d-flex justify-content-between align-items-center p-2 bg- #755940b9 text-white">
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
        <h1 className="text-center mb-4 text-light">Help & Support</h1>

        {/* FAQ Section */}
        <div className="faq-section bg-light p-4 rounded shadow">
          <h2 className="mb-3">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How do I generate a story?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  To generate a story, go to the "Generate" page, fill in the
                  required details such as language, character details, and
                  setting, and click the "Generate Story" button.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Can I save or download the generated story?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, after generating a story, you will see options to save or
                  download the story in the "Generated Video" section.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Who can I contact for support?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  For support, you can contact us via the "Contact Us" section
                  on the website or email us at support@echoesinmotion.com.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section mt-5 bg-light p-4 rounded shadow">
          <h2 className="mb-3">Contact Us</h2>
          <p>
            If you have any questions or need further assistance, feel free to
            reach out to us:
          </p>
          <ul>
            <li>Email: support@echoesinmotion.com</li>
            <li>Phone: +1-234-567-890</li>
            <li>Address: 123 Story Lane, Folktale City, World</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Help;