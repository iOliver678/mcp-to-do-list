import React from 'react'
import Message from './Message'

function MessagesContainer({ 
  messages, 
  isLoading, 
  streamingMessage, 
  messagesEndRef 
}) {
  return (
    <div className="messages-container">
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Type a message below to begin chatting with the AI</p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      
      {(isLoading && streamingMessage) && (
        <Message 
          isStreaming={true}
          streamingMessage={streamingMessage}
          isLoading={isLoading}
        />
      )}
      
      {(isLoading && !streamingMessage) && (
        <Message isLoading={isLoading} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesContainer 