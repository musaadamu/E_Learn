import React, { useState } from "react";
import Header from "../components/Common/Header";
import Navigation from "../components/Common/Navigation";
import Footer from "../components/Common/Footer";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit contact form goes here
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* <Header />
      <Navigation /> */}
      <header className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out with any questions or comments.</p>
      </header>

      {/* Contact Information Section */}
      <section className="contact-info">
        <h2>Our Contact Information</h2>
        <p>Address: 123 University Ave, City, Country</p>
        <p>Phone: +1 234 567 890</p>
        <p>Email: info@elearn.com</p>
        <div className="map-container">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.095658105768!2d-122.08424908468152!3d37.42206597982545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0a8c7b3ad3d%3A0x9c8e81f5b09f2f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1616625020198!5m2!1sen!2sus"
            width="100%"
            height="250"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        {submitted ? (
          <p>Thank you for contacting us! We will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        )}
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
