
import { useState, useRef, useEffect } from 'react'
import './App.css'
import ChatHeader from './components/ChatHeader'
import MessagesContainer from './components/MessagesContainer'
import MessageInput from './components/MessageInput'

function App() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setStreamingMessage('')

    try {
      // Send message to FastAPI backend
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const response = await fetch('http://localhost:8000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `${userMessage} (today is ${currentDate})`
        })
      })
      if (!response.ok) {
        throw new Error('Server error')
      }
      const data = await response.json()
      let assistantMessage = ''
      assistantMessage = data.response
      // Simulate streaming effect
      let currentText = ''
      for (let i = 0; i < assistantMessage.length; i++) {
        currentText += assistantMessage[i]
        setStreamingMessage(currentText)
        await new Promise(resolve => setTimeout(resolve, 10))
      }
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
      setStreamingMessage('')
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not connect to backend or parse response.' }])
      setStreamingMessage('')
    }
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="app">
      <div className="chat-container">
        <ChatHeader />
        
        <MessagesContainer 
          messages={messages}
          isLoading={isLoading}
          streamingMessage={streamingMessage}
          messagesEndRef={messagesEndRef}
        />
        
        <MessageInput 
          inputValue={inputValue}
          setInputValue={setInputValue}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default App
