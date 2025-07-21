import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Mic, FileText, Paperclip, Brain } from 'lucide-react'
import { useDemoOrchestration } from '../hooks/useDemoOrchestration'

const StrategyNarrativeCenter: React.FC = () => {
  const { demoState, getCurrentStep, setTyping } = useDemoOrchestration()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      content: 'Hey there! I\'m Adam, your AI assistant. I\'m here to help you navigate complex business intelligence and strategic decisions. Ready to see what we can accomplish together?',
      timestamp: '10:29 AM',
      files: []
    }
  ])

  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState('')

  // Demo orchestration integration
  useEffect(() => {
    const currentStep = getCurrentStep()
    if (currentStep && demoState.isPlaying) {
      const typingSpeed = currentStep.typingSpeed === 'human' ? 60 : 180 // WPM
      const delay = currentStep.delay || 500
      
      setTimeout(() => {
        simulateTyping(currentStep.content, typingSpeed, currentStep.type, currentStep.metadata)
      }, delay)
    }
  }, [demoState.currentStep, demoState.currentScenario, getCurrentStep, demoState.isPlaying, setTyping, messages.length])

  // Realistic typing simulation
  const simulateTyping = (content: string, wpm: number, messageType: string, metadata?: any) => {
    setIsTyping(true)
    setTyping(true)
    setTypingText('')
    
    const wordsPerSecond = wpm / 60
    const words = content.split(' ')
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex < words.length) {
        setTypingText(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex])
        currentIndex++
      } else {
        clearInterval(typeInterval)
        
        // Add completed message
        const newMessage = {
          id: messages.length + Date.now(),
          type: messageType as 'ai' | 'user',
          content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          files: metadata?.files || [],
          metadata
        }
        
        setMessages(prev => [...prev, newMessage])
        setIsTyping(false)
        setTyping(false)
        setTypingText('')
      }
    }, 1000 / wordsPerSecond)
  }

  // Manual message sending (for non-demo interaction)
  const sendMessage = () => {
    if (currentMessage.trim() && !demoState.isPlaying) {
      const userMessage = {
        id: messages.length + Date.now(),
        type: 'user' as const,
        content: currentMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        files: []
      }
      setMessages(prev => [...prev, userMessage])
      setCurrentMessage('')
      
      // Simulate Adam's response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me analyze the data and provide you with actionable insights.",
          "I've processed your request and found some interesting patterns in your business metrics.",
          "Based on your query, I can see several optimization opportunities we should explore."
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        simulateTyping(randomResponse, 180, 'ai')
      }, 1000)
    }
  }

  return (
    <motion.div 
      className="bg-charcoal-prime flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="border-b border-steel-frame p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-pulse/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-indigo-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-platinum-text">
                Strategic Narrative Insights
              </h2>
              <p className="text-sm text-silver-muted">
                Executive Intelligence Conversation
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-silver-muted">Active Session</span>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex w-full ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <div className={`relative w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl ${
              message.type === 'user' 
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 backdrop-blur-sm border border-indigo-400/30 text-white/95 shadow-2xl' 
                : 'bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.12] text-white/95 shadow-2xl transition-all duration-300'
            }`}>
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
              
              {/* Message Header for AI */}
              {message.type === 'ai' && (
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 backdrop-blur-sm rounded-lg border border-indigo-400/30 shadow-lg">
                    <Brain className="w-4 h-4 text-indigo-300" />
                  </div>
                  <span className="text-sm font-semibold text-indigo-300">Adam</span>
                  {message.metadata?.copilotSize && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      message.metadata.copilotSize === 'dramatic' ? 'bg-violet-glow/20 text-violet-glow' :
                      message.metadata.copilotSize === 'large' ? 'bg-indigo-pulse/20 text-indigo-pulse' :
                      'bg-steel-frame text-silver-muted'
                    }`}>
                      {message.metadata.copilotSize}
                    </span>
                  )}
                </div>
              )}
              
              <p className="text-sm sm:text-base leading-relaxed relative z-10">{message.content}</p>
              
              {/* File Attachments */}
              {message.files && message.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.files.map((file, fileIndex) => (
                    <motion.div
                      key={fileIndex}
                      className="flex items-center space-x-3 p-2 bg-charcoal-prime rounded-lg border border-steel-frame"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + fileIndex * 0.1 }}
                    >
                      <span className="text-lg">{file.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-platinum-text truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-silver-muted truncate">
                          {file.preview}
                        </div>
                      </div>
                      <Paperclip className="w-3 h-3 text-silver-muted" />
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="mt-3 text-xs sm:text-sm opacity-70 relative z-10">{message.timestamp}</div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-slate-depth border border-steel-frame p-4 rounded-lg max-w-[80%]">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-indigo-pulse" />
                <span className="text-xs font-medium text-indigo-pulse">Adam</span>
              </div>
              
              {typingText ? (
                <div className="text-sm leading-relaxed text-platinum-text">
                  {typingText}
                  <span className="inline-block w-2 h-4 bg-indigo-pulse ml-1 animate-pulse"></span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-pulse rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-pulse rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-pulse rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-silver-muted">Adam is thinking...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <motion.div 
        className="border-t border-steel-frame p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={demoState.isPlaying ? "Demo mode active - use controller to advance" : "Ask Adam about business intelligence, strategic insights, or operational optimization..."}
              disabled={demoState.isPlaying}
              className={`w-full bg-slate-depth border border-steel-frame rounded-lg px-4 py-3 text-sm text-platinum-text placeholder-silver-muted focus:outline-none focus:border-indigo-pulse transition-colors ${
                demoState.isPlaying ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && currentMessage.trim() && !demoState.isPlaying) {
                  sendMessage()
                }
              }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={demoState.isPlaying || !currentMessage.trim()}
            className={`p-3 bg-indigo-pulse hover:bg-violet-glow rounded-lg transition-colors ${
              demoState.isPlaying || !currentMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send className="w-4 h-4 text-platinum-text" />
          </button>
          <button 
            disabled={demoState.isPlaying}
            className={`p-3 bg-steel-frame hover:bg-slate-depth rounded-lg transition-colors ${
              demoState.isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Mic className="w-4 h-4 text-silver-muted" />
          </button>
          <button 
            disabled={demoState.isPlaying}
            className={`p-3 bg-steel-frame hover:bg-slate-depth rounded-lg transition-colors ${
              demoState.isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FileText className="w-4 h-4 text-silver-muted" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StrategyNarrativeCenter
