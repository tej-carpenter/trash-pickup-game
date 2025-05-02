// client/src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

function Chat() {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, username } = useSocket();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="card h-96 flex flex-col">
      <h2 className="text-xl font-bold mb-2">Room Chat</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.username === username
                  ? 'bg-primary text-white ml-auto'
                  : msg.username === 'System'
                  ? 'bg-gray-200 text-gray-700 mx-auto text-center text-sm'
                  : 'bg-gray-100'
              }`}
            >
              {msg.username !== 'System' && (
                <div className="font-bold text-sm">
                  {msg.username === username ? 'You' : msg.username}
                </div>
              )}
              <div>{msg.message}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex mt-auto">
        <input
          type="text"
          className="input flex-1 rounded-r-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-secondary rounded-l-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;