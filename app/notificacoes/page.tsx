"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface NotificationItem {
  id: string
  type: "like" | "comment" | "mention" | "follow"
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
  postPreview?: string
  action?: string
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Marta Vieira",
      avatar: "/marta-vieira.jpg",
    },
    content: "curtiu seu post sobre o jogo de ontem",
    timestamp: "2 minutos atrás",
    read: false,
    postPreview: "/placeholder.svg?key=post1",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Formiga",
      avatar: "/placeholder.svg?key=formiga",
    },
    content: 'comentou: "Que jogada incrível!"',
    timestamp: "5 minutos atrás",
    read: false,
    postPreview: "/placeholder.svg?key=post2",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Passaabola",
      avatar: "/placeholder.svg?key=passa",
    },
    content: "começou a te seguir",
    timestamp: "10 minutos atrás",
    read: false,
    action: "Seguir de volta",
  },
  {
    id: "4",
    type: "mention",
    user: {
      name: "Gabi Portilho",
      avatar: "/placeholder.svg?key=gabi",
    },
    content: "mencionou você em um post",
    timestamp: "15 minutos atrás",
    read: false,
    postPreview: "/placeholder.svg?key=post3",
  },
  {
    id: "5",
    type: "like",
    user: {
      name: "Ana Silva e 12 outras pessoas",
      avatar: "/ana-portrait.png",
    },
    content: "curtiram seu post",
    timestamp: "20 minutos atrás",
    read: false,
    postPreview: "/placeholder.svg?key=post4",
  },
  {
    id: "6",
    type: "comment",
    user: {
      name: "Ary Borges",
      avatar: "/placeholder.svg?key=ary",
    },
    content: "curtiu seu comentário",
    timestamp: "1 hora atrás",
    read: false,
    postPreview: "/placeholder.svg?key=post5",
  },
  {
    id: "7",
    type: "follow",
    user: {
      name: "Duda Santos",
      avatar: "/placeholder.svg?key=duda",
    },
    content: "começou a te seguir",
    timestamp: "2 horas atrás",
    read: false,
    action: "Seguir de volta",
  },
]

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [selectedTab, setSelectedTab] = useState("Todas")

  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  const tabs = ["Todas", "Menções", "Curtidas", "Seguidores"]

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Notificações</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Check className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  selectedTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 p-4 hover:bg-accent/50 transition-colors relative">
                {!notification.read && (
                  <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                )}

                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user.name}</span> {notification.content}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>

                  {notification.action && (
                    <Button size="sm" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      {notification.action}
                    </Button>
                  )}
                </div>

                {notification.postPreview && (
                  <img
                    src={notification.postPreview || "/placeholder.svg"}
                    alt="Post preview"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
