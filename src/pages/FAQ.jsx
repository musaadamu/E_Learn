import React, { useState } from "react";
import Header from "../components/Common/Header";
import Navigation from "../components/Common/Navigation";
import Footer from "../components/Common/Footer";
import "./FAQ.css";

const faqData = [
  { question: "What is E-Learn?", answer: "E-Learn is a comprehensive LMS designed to streamline academic processes." },
  { question: "How do I enroll in a course?", answer: "You can enroll in courses via your dashboard or through admin approval." },
  // Add additional FAQs as needed
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-page">
      {/* <Header />
      <Navigation /> */}
      <header className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Your questions answered.</p>
      </header>
      <section className="faq-section">
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="faq-list">
          {filteredFaq.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default FAQ;
