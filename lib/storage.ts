// LocalStorage utilities for data persistence

export interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  content: string
  timestamp: string
  image?: string
  hashtags: string[]
  likes: number
  comments: number
  shares: number
  likedBy: string[]
}

export interface Game {
  id: string
  title: string
  status: "Aberto" | "Lotado"
  organizer: {
    name: string
    avatar: string
  }
  date: string
  time: string
  location: string
  city: string
  participants: string
  price: string
  description: string
  level: string
  attendees: { avatar: string }[]
}

export interface Notification {
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
}

export interface Message {
  id: string
  conversationId: string
  sender: string
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
}

const STORAGE_KEYS = {
  POSTS: "futfem-posts",
  GAMES: "futfem-games",
  NOTIFICATIONS: "futfem-notifications",
  MESSAGES: "futfem-messages",
  CONVERSATIONS: "futfem-conversations",
  CURRENT_USER: "futfem-current-user",
}

// Initialize with mock data if empty
export const initializeData = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    const initialPosts: Post[] = [
      {
        id: "1",
        author: {
          name: "Marta Vieira",
          username: "marta10oficial",
          avatar: "/marta-vieira.jpg",
          verified: true,
        },
        content: "Que jogo incrível hoje! O futebol feminino brasileiro está cada vez mais forte. Parabéns meninas! ⚽",
        timestamp: "2h",
        hashtags: ["#FutFem", "#OrgulhoBrasileiro"],
        likes: 1247,
        comments: 89,
        shares: 156,
        likedBy: [],
      },
    ]
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialPosts))
  }

  if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
    const initialGames: Game[] = [
      {
        id: "1",
        title: "Pelada no Parque Ibirapuera",
        status: "Aberto",
        organizer: {
          name: "Ana Silva",
          avatar: "/ana-portrait.png",
        },
        date: "Hoje",
        time: "16:00",
        location: "Campo do Parque Ibirapuera, São Paulo",
        city: "São Paulo",
        participants: "18/22 jogadoras",
        price: "R$ 10,00",
        description: "Jogo amistoso para se divertir e fazer novos contatos. Tragam água e protetor solar!",
        level: "Intermediário",
        attendees: Array(3).fill({ avatar: "/placeholder.svg?height=32&width=32" }),
      },
      {
        id: "2",
        title: "Treino Técnico - Copacabana",
        status: "Aberto",
        organizer: {
          name: "Juliana Costa",
          avatar: "/portrait-Juliana.png",
        },
        date: "Amanhã",
        time: "18:30",
        location: "Arena Copacabana, Rio de Janeiro",
        city: "Rio de Janeiro",
        participants: "15/20 jogadoras",
        price: "R$ 25,00",
        description: "Treino focado em técnica individual e jogadas ensaiadas. Ideal para quem quer evoluir!",
        level: "Avançado",
        attendees: Array(3).fill({ avatar: "/placeholder.svg?height=32&width=32" }),
      },
    ]
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(initialGames))
  }
}

export const getPosts = (): Post[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.POSTS)
  return data ? JSON.parse(data) : []
}

export const savePosts = (posts: Post[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
}

export const deletePost = (postId: string) => {
  if (typeof window === "undefined") return
  const posts = getPosts()
  const updatedPosts = posts.filter((post) => post.id !== postId)
  savePosts(updatedPosts)
  return updatedPosts
}

export const getGames = (): Game[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.GAMES)
  return data ? JSON.parse(data) : []
}

export const saveGames = (games: Game[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games))
}

export const getNotifications = (): Notification[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
  return data ? JSON.parse(data) : []
}

export const saveNotifications = (notifications: Notification[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
}

export const getConversations = (): Conversation[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)
  return data ? JSON.parse(data) : []
}

export const saveConversations = (conversations: Conversation[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
}

export const getMessages = (conversationId: string): Message[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
  const allMessages: Message[] = data ? JSON.parse(data) : []
  return allMessages.filter((msg) => msg.conversationId === conversationId)
}

export const saveMessage = (message: Message) => {
  if (typeof window === "undefined") return
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
  const allMessages: Message[] = data ? JSON.parse(data) : []
  allMessages.push(message)
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages))
}
