"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { PostCard } from "@/components/post-card"
import { SearchModal } from "@/components/search-modal"
import { Button } from "@/components/ui/button"
import { getPosts, type Post } from "@/lib/storage"

export default function ExplorarPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 py-6 text-muted-foreground bg-transparent"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span>Buscar pessoas, hashtags, posts...</span>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Explorar</h2>

          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </AppLayout>
  )
}
