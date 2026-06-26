import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import io from 'socket.io-client'
import { getAvatarUrl } from '../../utils/helpers'

// Single shared socket instance
let socketInstance = null

const getSocket = () => {
  if (!socketInstance || socketInstance.disconnected) {
    socketInstance = io('https://digital-partner.onrender.com', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
  }
  return socketInstance
}

const ChatRoom = ({ projectId, projectTitle }) => {
  const { user, token } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const socketRef = useRef(null)
  const roomJoined = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch existing messages
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/chat/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(res.data || [])
    } catch (err) {
      console.error('Fetch messages error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [projectId, token])

  // Setup socket
  useEffect(() => {
    if (!projectId || !user?._id) return

    const socket = getSocket()
    socketRef.current = socket

    const onConnect = () => {
      setIsConnected(true)
      if (!roomJoined.current) {
        socket.emit('joinRoom', { userId: user._id, projectId })
        socket.emit('userOnline', user._id)
        roomJoined.current = true
      }
    }

    const onDisconnect = () => {
      setIsConnected(false)
      roomJoined.current = false
    }

    const onReceiveMessage = (message) => {
      // Deduplicate: don't add if same _id already exists
      setMessages(prev => {
        const exists = prev.some(m => m._id && m._id.toString() === message._id?.toString())
        if (exists) return prev
        return [...prev, message]
      })
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('receiveMessage', onReceiveMessage)

    if (socket.connected) {
      onConnect()
    }

    fetchMessages()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('receiveMessage', onReceiveMessage)
      roomJoined.current = false
    }
  }, [projectId, user?._id, fetchMessages])

  const sendMessage = (e) => {
    e?.preventDefault()
    const text = newMessage.trim()
    if (!text || !socketRef.current || !isConnected) return

    const messageData = {
      projectId,
      senderId: user._id,
      message: text,
      senderName: user.name,
      senderAvatar: user.avatar || null,
    }

    socketRef.current.emit('sendMessage', messageData)
    setNewMessage('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const formatMsg = (text) => {
    if (!text) return ''
    return text.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-950 rounded-2xl shadow-sm border border-gray-800 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div>
          <h3 className="font-semibold text-sm">{projectTitle}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-300' : 'bg-white/40'}`} />
            <span className="text-xs text-indigo-100">{isConnected ? 'Live chat' : 'Connecting...'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src={getAvatarUrl(user?.name, user?.avatar)}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center mb-3 shadow-sm">
              <svg className="w-7 h-7 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs mt-0.5">Be the first to say something!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.senderId?.toString() === user?._id?.toString()
            const senderAvatar = getAvatarUrl(msg.senderName, msg.senderAvatar)
            return (
              <motion.div
                key={msg._id || i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img
                    src={senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
                    onError={(e) => { e.target.src = getAvatarUrl(msg.senderName, null) }}
                  />
                )}
                <div className={`max-w-[72%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe && (
                    <p className="text-xs font-semibold text-gray-400 px-1 mb-0.5">{msg.senderName}</p>
                  )}
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-900 text-gray-100 border border-gray-700 rounded-bl-sm shadow-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap break-words">{formatMsg(msg.message)}</p>
                  </div>
                  <p className="text-xs text-gray-500 px-1 mt-0.5">
                    {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true }) : 'just now'}
                  </p>
                </div>
                {isMe && (
                  <img
                    src={getAvatarUrl(user.name, user.avatar)}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
                    onError={(e) => { e.target.src = getAvatarUrl(user.name, null) }}
                  />
                )}
              </motion.div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-gray-950 border-t border-gray-800">
        <form onSubmit={sendMessage} className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
            disabled={!isConnected}
            rows={1}
            className="flex-1 px-4 py-2.5 bg-black text-gray-100 border border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none disabled:opacity-50"
            style={{ minHeight: '44px', maxHeight: '88px' }}
          />
          <button
            type="submit"
            disabled={!isConnected || !newMessage.trim()}
            className="p-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <svg className="w-5 h-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </motion.div>
  )
}

export default ChatRoom;