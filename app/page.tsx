"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"
import { UpcomingGames } from "@/components/upcoming-games"
import { getPosts, savePosts, deletePost, type Post } from "@/lib/storage"

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setPosts(getPosts())
  }, [])

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "Seu Perfil",
        username: "seuperfil",
        avatar: "/placeholder.svg?key=user",
        verified: false,
      },
      content,
      timestamp: "agora",
      hashtags: [],
      likes: 0,
      comments: 0,
      shares: 0,
      likedBy: [],
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes("current-user")
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked ? post.likedBy.filter((id) => id !== "current-user") : [...post.likedBy, "current-user"],
        }
      }
      return post
    })
    setPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  const handleDelete = (postId: string) => {
    const updatedPosts = deletePost(postId)
    setPosts(updatedPosts)
  }

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <CreatePost onPost={handleCreatePost} />

          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20">
            <UpcomingGames />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
