import React, { useRef } from 'react'

function MessageInput({ 
  inputValue, 
  setInputValue, 
  isLoading, 
  handleSubmit, 
  handleKeyPress 
}) {
  const inputRef = useRef(null)

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          disabled={isLoading}
          rows={1}
          className="message-input"
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isLoading}
          className="send-button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default MessageInput 