import React, { useState } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./Messaging.css"; // Custom styles for Messaging page

const Messaging = () => {
  // Example static data for conversations and messages
  const [conversations] = useState([
    {
      id: 1,
      contactName: "John Doe",
      lastMessage: "Can we discuss the new course syllabus?",
      avatar: "/assets/images/avatar1.png",
    },
    {
      id: 2,
      contactName: "Jane Smith",
      lastMessage: "I have a question about the assignment.",
      avatar: "/assets/images/avatar2.png",
    },
  ]);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    console.log("Send message:", messageText);
    setMessageText("");
  };

  return (
    <div className="faculty-messaging">
      {/* Header */}
      <Header />
      <Navigation />
      <div className="breadcrumb">
        <span>Home</span> / <span>Messaging</span>
      </div>
      <h1>Faculty Messaging</h1>

      {/* Two-Column Layout */}
      <div className="messaging-container">
        {/* Left Column – Conversation List */}
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${activeConversation.id === conv.id ? "active" : ""}`}
              onClick={() => setActiveConversation(conv)}
            >
              <img src={conv.avatar} alt={conv.contactName} className="avatar" />
              <div className="conversation-info">
                <h3>{conv.contactName}</h3>
                <p>{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column – Active Chat Window */}
        <div className="chat-window">
          <div className="chat-header">
            <h2>{activeConversation.contactName}</h2>
            {/* Optionally display online status */}
            <span className="status">Online</span>
          </div>
          <div className="chat-history">
            {/* Replace with dynamic messages; here is a static example */}
            <div className="message received">
              <p>Hello, can we discuss the syllabus?</p>
              <span className="timestamp">10:00 AM</span>
            </div>
            <div className="message sent">
              <p>Sure, let's schedule a meeting.</p>
              <span className="timestamp">10:05 AM</span>
            </div>
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messaging;
