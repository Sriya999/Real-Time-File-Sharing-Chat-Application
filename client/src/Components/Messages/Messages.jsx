import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => {
      // File message: has data and type
      if (message.data && message.type) {
        const trimmedName = name.trim().toLowerCase();
        const isSentByCurrentUser = message.user && message.user.trim().toLowerCase() === trimmedName;
        const containerClass = isSentByCurrentUser ? "messageContainer justifyEnd" : "messageContainer justifyStart";
        const senderClass = isSentByCurrentUser ? "sentText pr-10" : "sentText pl-10";
        const boxClass = isSentByCurrentUser ? "messageBox backgroundBlue" : "messageBox backgroundLight";
        const textClass = isSentByCurrentUser ? "messageText colorWhite" : "messageText colorDark";
        return (
          <div key={i} className={containerClass}>
            {isSentByCurrentUser && <p className={senderClass}>{trimmedName}</p>}
            <div className={boxClass} style={{ padding: 8 }}>
              {message.type.startsWith('image/') ? (
                <img src={message.data} alt={message.name} style={{ maxWidth: '200px', borderRadius: '8px', margin: '8px 0' }} />
              ) : (
                <a href={message.data} download={message.name} className={textClass} style={{ color: isSentByCurrentUser ? '#fff' : '#2979FF', textDecoration: 'underline' }}>
                  {message.name}
                </a>
              )}
            </div>
            {!isSentByCurrentUser && <p className={senderClass}>{message.user}</p>}
          </div>
        );
      }
      // Regular text message
      return <div key={i}><Message message={message} name={name}/></div>;
    })}
  </ScrollToBottom>
);

export default Messages;