"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreVertical, Phone, Video, Info, Paperclip, ImageIcon, Send, Smile } from "lucide-react"

interface Conversation {
  id: string
  name: string
  avatar: string
  role: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Message {
  id: string
  sender: "recruiter" | "candidate"
  content: string
  time: string
}

interface MessageThreadProps {
  conversation: Conversation
  messages: Message[]
}

export function MessageThread({ conversation, messages }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // In a real app, you would send the message to the server here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Conversation header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.online ? "Đang hoạt động" : "Không hoạt động"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "recruiter" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "candidate" && (
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`max-w-md rounded-lg px-4 py-2 ${
                    message.sender === "recruiter" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{message.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex gap-1">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
