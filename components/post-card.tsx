"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, CheckCircle, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/storage"

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onDelete?: (postId: string) => void
  currentUser?: string
}

export function PostCard({ post, onLike, onDelete, currentUser = "seuperfil" }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    onLike?.(post.id)
  }

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      onDelete?.(post.id)
    }
  }

  const isOwnPost = post.author.username === currentUser

  return (
    <Card className="p-4 card-entrance card-hover">
      <div className="flex gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.author.name}</span>
            {post.author.verified && <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />}
            <span className="text-sm text-muted-foreground">@{post.author.username}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{post.timestamp}</span>

            {isOwnPost && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto smooth-transition hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 icon-bounce-hover" />
              </Button>
            )}
          </div>

          <p className="mt-2 text-foreground">{post.content}</p>

          {post.image && <img src={post.image || "/placeholder.svg"} alt="Post" className="mt-3 rounded-xl w-full" />}

          <div className="mt-1 flex flex-wrap gap-2">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-6 text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 smooth-transition hover:text-primary hover:bg-primary/10"
              onClick={handleLike}
            >
              <Heart className="h-5 w-5 icon-bounce-hover" />
              <span>{likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 smooth-transition hover:text-primary hover:bg-primary/10"
            >
              <MessageCircle className="h-5 w-5 icon-bounce-hover" />
              <span>{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 smooth-transition hover:text-primary hover:bg-primary/10"
            >
              <Share2 className="h-5 w-5 icon-bounce-hover" />
              <span>{post.shares}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
