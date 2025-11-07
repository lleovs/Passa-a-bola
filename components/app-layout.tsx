"use client"

import type React from "react"

import { useEffect } from "react"
import { Navigation } from "./navigation"
import { initializeData } from "@/lib/storage"

export function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
