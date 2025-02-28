import React, { useState, useEffect, useRef } from "react";
import "./Messaging.css"; // Define styles accordingly

const Messaging = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Dummy data for conversations
  useEffect(() => {
    const dummyConversations = [
      {
        id: "1",
        contactName: "Professor John",
        avatar: "/assets/images/avatar1.png",
        lastMessage: "Please review the assignment.",
        unread: 1,
      },
      {
        id: "2",
        contactName: "Student Jane",
        avatar: "/assets/images/avatar2.png",
        lastMessage: "I have a question about the project.",
        unread: 0,
      },
      // Additional dummy conversations...
    ];
    setConversations(dummyConversations);
    // Automatically select the first conversation if available
    if (dummyConversations.length > 0) {
      setActiveConversation(dummyConversations[0]);
    }
  }, []);

  // Dummy messages for the active conversation
  useEffect(() => {
    if (!activeConversation) return;
    const dummyMessages = [
      { id: "m1", sender: activeConversation.contactName, content: "Hello, please review the assignment.", timestamp: "10:00 AM" },
      { id: "m2", sender: "You", content: "Sure, I'll check it out.", timestamp: "10:05 AM" },
    ];
    setMessages(dummyMessages);
    scrollToBottom();
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const messageObj = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <div className="student-messaging">
      {/* Page Header / Title Block */}
      <header className="page-header">
        <h1>Messaging</h1>
        <input type="text" placeholder="Search conversations..." className="search-bar" />
      </header>

      {/* Two-Column Layout */}
      <div className="messaging-container">
        {/* Left Column – Conversation List */}
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${activeConversation?.id === conv.id ? "active" : ""}`}
              onClick={() => setActiveConversation(conv)}
            >
              <img src={conv.avatar} alt={conv.contactName} className="avatar" />
              <div className="conversation-info">
                <h3>{conv.contactName}</h3>
                <p>{conv.lastMessage}</p>
                {conv.unread > 0 && <span className="unread-indicator">{conv.unread}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column – Active Chat Window */}
        <div className="chat-window">
          <div className="chat-header">
            <h2>{activeConversation ? activeConversation.contactName : "Select a Conversation"}</h2>
            {activeConversation && <span className="status">Online</span>}
          </div>
          <div className="chat-history">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
                <p>{msg.content}</p>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>

      {/* Footer or Additional Options (Optional) can be added here */}
    </div>
  );
};

export default Messaging;
