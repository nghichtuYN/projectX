"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

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

interface MessageListProps {
  conversations: Conversation[]
  selectedId: string
  onSelect: (conversation: Conversation) => void
}

export function MessageList({ conversations, selectedId, onSelect }: MessageListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex w-full flex-col border-r md:w-80 lg:w-96">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Tin nhắn</h2>
        <Button size="icon" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative px-4 pb-2">
        <Search className="absolute left-7 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm tin nhắn..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {filteredConversations.length > 0 ? (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50 ${
                  selectedId === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => onSelect(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{conversation.name}</p>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{conversation.role}</p>
                  <p className="mt-1 truncate text-sm">{conversation.lastMessage}</p>
                </div>

                {conversation.unread > 0 && (
                  <div className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-muted-foreground">
            <p>Không tìm thấy kết quả phù hợp</p>
          </div>
        )}
      </div>
    </div>
  )
}
