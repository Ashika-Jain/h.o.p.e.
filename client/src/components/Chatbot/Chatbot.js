import React, { useState } from 'react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return; // Avoid sending empty messages

    const newMessage = {
      sender: 'user',
      message: userInput,
    };

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      const botMessage = {
        sender: 'bot',
        message: data.response,
      };

      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        sender: 'bot',
        message: 'Sorry, there was an error processing your message.',
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chat-container" style={styles.chatContainer}>
      <h1 style={styles.header}>Chatbot</h1>
      <div id="chat-history" style={styles.chatHistory}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={message.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {message.message}
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={handleFormSubmit} style={styles.form}>
        <input
          type="text"
          id="user-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your message"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  chatContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#068fa0',
  },
  chatHistory: {
    height: '300px',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  userMessage: {
    textAlign: 'right',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    marginBottom: '5px',
  },
  botMessage: {
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#cdf6f8',
    borderRadius: '10px',
    marginBottom: '5px',
  },
  form: {
    display: 'flex',
  },
  input: {
    flexGrow: '1',
    marginRight: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#068fa0',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default Chatbot;
