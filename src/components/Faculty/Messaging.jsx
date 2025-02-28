import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { courseService } from '../../services/courseService';

const Messaging = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  // Get initial recipient from query params if available
  const queryParams = new URLSearchParams(location.search);
  const initialRecipientId = queryParams.get('to');
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        // Fetch all conversations for the faculty member
        const response = await courseService.getFacultyConversations();
        setConversations(response.data);
        
        // If there's an initial recipient ID from the URL
        if (initialRecipientId) {
          const existingConversation = response.data.find(
            conv => conv.recipientId === initialRecipientId
          );
          
          if (existingConversation) {
            setSelectedConversation(existingConversation);
            fetchMessages(existingConversation.id);
          } else {
            // Fetch recipient details to start a new conversation
            const recipientResponse = await courseService.getUserById(initialRecipientId);
            const newConv = {
              id: 'new',
              recipientId: initialRecipientId,
              recipientName: recipientResponse.data.name,
              recipientAvatar: recipientResponse.data.avatar,
              lastMessage: '',
              unread: 0,
              timestamp: new Date()
            };
            setSelectedConversation(newConv);
          }
        } else if (response.data.length > 0) {
          // Select first conversation by default if available
          setSelectedConversation(response.data[0]);
          fetchMessages(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchRecipients = async () => {
      try {
        // Fetch possible recipients (students, other faculty, etc.)
        const response = await courseService.getPossibleMessageRecipients();
        setRecipients(response.data);
      } catch (error) {
        console.error('Error fetching recipients:', error);
      }
    };

    fetchConversations();
    fetchRecipients();
  }, [initialRecipientId]);

  useEffect(() => {
    // Scroll to bottom of messages whenever messages change
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (conversationId) => {
    if (conversationId === 'new') return;
    
    try {
      setIsLoading(true);
      const response = await courseService.getConversationMessages(conversationId);
      setMessages(response.data);
      
      // Mark conversation as read
      markConversationAsRead(conversationId);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markConversationAsRead = async (conversationId) => {
    try {
      await courseService.markConversationAsRead(conversationId);
      
      // Update the conversations list to remove unread indicator
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversationId ? { ...conv, unread: 0 } : conv
        )
      );
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const messageData = {
        content: newMessage,
        recipientId: selectedConversation.recipientId,
        conversationId: selectedConversation.id === 'new' ? null : selectedConversation.id
      };
      
      const response = await courseService.sendMessage(messageData);
      
      // If this was a new conversation, update the conversation object with the new ID
      if (selectedConversation.id === 'new') {
        const newConversation = {
          ...selectedConversation,
          id: response.data.conversationId,
          lastMessage: newMessage,
          timestamp: new Date()
        };
        
        setSelectedConversation(newConversation);
        
        // Add this conversation to the list
        setConversations(prev => [newConversation, ...prev]);
      } else {
        // Update existing conversation in the list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversation.id 
              ? { 
                  ...conv, 
                  lastMessage: newMessage,
                  timestamp: new Date()
                } 
              : conv
          ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
      }
      
      // Add message to the current conversation
      const newMessageObj = {
        id: response.data.id,
        content: newMessage,
        senderId: response.data.senderId, // Current user's ID
        timestamp: new Date(),
        isOutgoing: true
      };
      
      setMessages(prev => [...prev, newMessageObj]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNewConversation = () => {
    setShowNewMessageModal(true);
  };

  const handleStartNewConversation = async () => {
    if (!selectedRecipient) return;
    
    try {
      const recipientData = recipients.find(r => r.id === selectedRecipient);
      
      if (!recipientData) {
        console.error('Selected recipient not found');
        return;
      }
      
      // Check if conversation already exists
      const existingConversation = conversations.find(
        conv => conv.recipientId === selectedRecipient
      );
      
      if (existingConversation) {
        setSelectedConversation(existingConversation);
        fetchMessages(existingConversation.id);
      } else {
        // Create a new conversation object
        const newConv = {
          id: 'new',
          recipientId: selectedRecipient,
          recipientName: recipientData.name,
          recipientAvatar: recipientData.avatar,
          lastMessage: '',
          unread: 0,
          timestamp: new Date()
        };
        
        setSelectedConversation(newConv);
        setMessages([]);
      }
      
      setShowNewMessageModal(false);
      setSelectedRecipient('');
    } catch (error) {
      console.error('Error starting new conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredConversations = conversations.filter(conv => 
    conv.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faculty-messaging-container">
      <Header />
      
      <div className="messaging-content">
        <div className="conversations-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              className="new-message-btn"
              onClick={handleNewConversation}
            >
              New Message
            </button>
          </div>
          
          <div className="conversations-list">
            {isLoading && !selectedConversation ? (
              <div className="loading-spinner">Loading conversations...</div>
            ) : (
              filteredConversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                  onClick={() => handleConversationSelect(conversation)}
                >
                  <img 
                    src={conversation.recipientAvatar || '/default-avatar.png'} 
                    alt={conversation.recipientName}
                    className="recipient-avatar" 
                  />
                  <div className="conversation-details">
                    <div className="conversation-header">
                      <h4 className="recipient-name">{conversation.recipientName}</h4>
                      <span className="timestamp">
                        {new Date(conversation.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="last-message">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="unread-badge">{conversation.unread}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="messages-container">
          {selectedConversation ? (
            <>
              <div className="messages-header">
                <div className="recipient-info">
                  <img 
                    src={selectedConversation.recipientAvatar || '/default-avatar.png'} 
                    alt={selectedConversation.recipientName}
                    className="recipient-avatar-lg" 
                  />
                  <h3>{selectedConversation.recipientName}</h3>
                </div>
              </div>
              
              <div className="messages-list">
                {isLoading ? (
                  <div className="loading-spinner">Loading messages...</div>
                ) : (
                  <>
                    {messages.length === 0 ? (
                      <div className="empty-conversation">
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`message ${message.isOutgoing ? 'outgoing' : 'incoming'}`}
                        >
                          <div className="message-content">{message.content}</div>
                          <div className="message-timestamp">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              
              <div className="message-input-container">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="message-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  onClick={handleSendMessage} 
                  className="send-button"
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-conversation-selected">
              <p>Select a conversation or start a new one.</p>
              <button 
                className="start-conversation-btn"
                onClick={handleNewConversation}
              >
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showNewMessageModal && (
        <div className="modal-overlay">
          <div className="new-message-modal">
            <h3>New Message</h3>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="recipient-select"
            >
              <option value="">Select a recipient</option>
              {recipients.map(recipient => (
                <option key={recipient.id} value={recipient.id}>
                  {recipient.name} - {recipient.role}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button 
                onClick={() => setShowNewMessageModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleStartNewConversation}
                className="start-btn"
                disabled={!selectedRecipient}
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Messaging;