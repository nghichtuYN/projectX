'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

type Conversation = {
  id: number
  name: string
  lastMessage: string
  avatar: string
}

const conversations: Conversation[] = [
  { id: 1, name: "Alice Smith", lastMessage: "See you tomorrow!", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Bob Johnson", lastMessage: "How's the project going?", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", avatar: "/placeholder.svg?height=40&width=40" },
]

const messages: Message[] = [
  { id: 1, sender: "Alice", content: "Hey there! How are you doing?", timestamp: "10:00 AM" },
  { id: 2, sender: "You", content: "Hi Alice! I'm doing well, thanks for asking. How about you?", timestamp: "10:05 AM" },
  { id: 3, sender: "Alice", content: "I'm great! Just working on some new designs. What are you up to?", timestamp: "10:10 AM" },
  { id: 4, sender: "You", content: "That sounds interesting! I'm just catching up on some coding. Any exciting projects?", timestamp: "10:15 AM" },
  { id: 5, sender: "Alice", content: "Yes, actually! I'm working on a new app interface. I'd love to get your opinion on it sometime.", timestamp: "10:20 AM" },
]

export default function DirectMessaging() {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r bg-gray-50 dark:bg-gray-800">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Conversations</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="flex items-center space-x-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <Avatar>
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{conversation.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Message Area */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="border-t p-4 flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

