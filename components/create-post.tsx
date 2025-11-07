"use client"

import { useState } from "react"
import { ImageIcon, BarChart3, MapPin, Smile } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CreatePostProps {
  onPost?: (content: string) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("")
  const maxChars = 280

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content)
      setContent("")
    }
  }

  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src="/placeholder.svg?key=user" alt="Seu perfil" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="O que está acontecendo no futebol feminino?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-0 p-0 text-lg focus-visible:ring-0"
            maxLength={maxChars}
          />

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-primary hover:bg-primary/10">
                <ImageIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Foto/Vídeo</span>
              </Button>

              <Button variant="ghost" size="sm" className="gap-2 text-primary hover:bg-primary/10">
                <BarChart3 className="h-5 w-5" />
                <span className="hidden sm:inline">Enquete</span>
              </Button>

              <Button variant="ghost" size="sm" className="gap-2 text-primary hover:bg-primary/10">
                <MapPin className="h-5 w-5" />
                <span className="hidden sm:inline">Local</span>
              </Button>

              <Button variant="ghost" size="sm" className="gap-2 text-primary hover:bg-primary/10">
                <Smile className="h-5 w-5" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {content.length}/{maxChars}
              </span>
              <Button
                onClick={handlePost}
                disabled={!content.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
