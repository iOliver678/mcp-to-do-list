import React from 'react'
import ReactMarkdown from 'react-markdown'

function Message({ message, isStreaming, streamingMessage, isLoading }) {
  if (isLoading && streamingMessage) {
    return (
      <div className="message assistant">
        <div className="message-avatar">🤖</div>
        <div className="message-content">
          <ReactMarkdown>{streamingMessage}</ReactMarkdown>
          <span className="cursor">|</span>
        </div>
      </div>
    )
  }

  if (isLoading && !streamingMessage) {
    return (
      <div className="message assistant">
        <div className="message-avatar">🤖</div>
        <div className="message-content">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {message.role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {message.role === 'assistant' ? (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}

export default Message 