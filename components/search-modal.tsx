"use client"

import { useState } from "react"
import { Search, X, Hash, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const suggestions = [
  {
    type: "user" as const,
    name: "Marta Vieira",
    username: "marta10oficial",
    avatar: "/marta-vieira.jpg",
    verified: true,
  },
  {
    type: "user" as const,
    name: "Luana Passaabola",
    username: "luanapsb_oficial",
    avatar: "/placeholder.svg?key=luana",
    verified: true,
  },
  {
    type: "hashtag" as const,
    tag: "#BrasileiroFeminino",
    posts: "8.2K posts",
  },
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar pessoas, hashtags, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 p-0 text-lg focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="max-h-[500px] overflow-y-auto p-4">
          <h3 className="mb-4 text-lg font-semibold">Sugestões para você</h3>

          <div className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg p-3 hover:bg-accent cursor-pointer">
                <div className="flex items-center gap-3">
                  {suggestion.type === "user" ? (
                    <>
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
                        <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{suggestion.name}</span>
                          {suggestion.verified && (
                            <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">@{suggestion.username}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Hash className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">{suggestion.tag}</div>
                        <span className="text-sm text-muted-foreground">{suggestion.posts}</span>
                      </div>
                    </>
                  )}
                </div>

                {suggestion.type === "user" && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
