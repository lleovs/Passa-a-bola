"use client"

import { useState } from "react"
import { X, Edit, Search, Send } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  user: {
    name: string
    avatar: string
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface Message {
  id: string
  sender: "me" | "other"
  content: string
  timestamp: string
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Marta Vieira",
      avatar: "/marta-vieira.jpg",
      online: true,
    },
    lastMessage: "Obrigada pelo apoio!",
    timestamp: "2 min",
    unreadCount: 2,
  },
  {
    id: "2",
    user: {
      name: "Formiga",
      avatar: "/placeholder.svg?key=formiga",
      online: false,
    },
    lastMessage: "Vamos marcar aquele treino?",
    timestamp: "1h",
    unreadCount: 0,
  },
  {
    id: "3",
    user: {
      name: "Passaabola",
      avatar: "/placeholder.svg?key=passa",
      online: true,
    },
    lastMessage: "Nova matéria sobre o Brasileirão",
    timestamp: "3h",
    unreadCount: 1,
  },
  {
    id: "4",
    user: {
      name: "Gabi Portilho",
      avatar: "/placeholder.svg?key=gabi",
      online: false,
    },
    lastMessage: "Que jogo incrível hoje!",
    timestamp: "5h",
    unreadCount: 0,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "other",
    content: "Oi! Vi seu post sobre o jogo de ontem",
    timestamp: "14:30",
  },
  {
    id: "2",
    sender: "me",
    content: "Oi Marta! Que jogo incrível mesmo!",
    timestamp: "14:32",
  },
  {
    id: "3",
    sender: "other",
    content: "Obrigada pelo apoio!",
    timestamp: "14:35",
  },
  {
    id: "4",
    sender: "me",
    content: "O futebol feminino está crescendo muito!",
    timestamp: "14:35",
  },
]

export default function MensagensPage() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>(mockConversations[0])
  const [messages] = useState<Message[]>(mockMessages)
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("")
    }
  }

  return (
    <AppLayout>
      <Card className="flex h-[calc(100vh-180px)] overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r">
          <div className="border-b p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Mensagens</h2>
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversas..." className="pl-10" />
            </div>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={cn(
                  "flex w-full items-center gap-3 border-b p-4 text-left transition-colors hover:bg-accent",
                  selectedConversation?.id === conversation.id && "bg-accent",
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{conversation.user.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
                </div>

                {conversation.unreadCount > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        {selectedConversation ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage
                    src={selectedConversation.user.avatar || "/placeholder.svg"}
                    alt={selectedConversation.user.name}
                  />
                  <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConversation.user.name}</h3>
                  <p className="text-xs text-primary">{selectedConversation.user.online ? "Online" : "Offline"}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2",
                      message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-accent",
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground",
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite uma mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Selecione uma conversa para começar
          </div>
        )}
      </Card>
    </AppLayout>
  )
}
