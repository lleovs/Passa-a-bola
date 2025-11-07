"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { GameCard } from "@/components/game-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getGames, type Game } from "@/lib/storage"

export default function JogosPage() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedTab, setSelectedTab] = useState("Todos")
  const [cityFilter, setCityFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  useEffect(() => {
    const allGames = getGames()
    // Add more games for better demonstration
    const expandedGames: Game[] = [
      ...allGames,
      {
        id: "3",
        title: "Jogo Beneficente - Instituto Ayrton Senna",
        status: "Lotado",
        organizer: {
          name: "Marta Vieira",
          avatar: "/marta-vieira.jpg",
        },
        date: "20/01",
        time: "14:00",
        location: "Centro de Treinamento, São Paulo",
        city: "São Paulo",
        participants: "22/22 jogadoras",
        price: "R$ 50,00",
        description:
          "Jogo beneficente com a participação de ex-jogadoras da seleção. Renda revertida para o instituto.",
        level: "Profissional",
        attendees: Array(20)
          .fill(null)
          .map(() => ({ avatar: "/placeholder.svg?height=32&width=32" })),
      },
    ]
    setGames(expandedGames)
  }, [])

  const tabs = ["Todos", "Hoje", "Esta Semana", "Meus Jogos"]

  const filteredGames = games.filter((game) => {
    if (cityFilter !== "all" && game.city !== cityFilter) return false
    if (levelFilter !== "all" && game.level !== levelFilter) return false
    return true
  })

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "default" : "outline"}
              onClick={() => setSelectedTab(tab)}
              className={
                selectedTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "border-primary text-primary hover:bg-primary/10"
              }
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas as Cidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos os Níveis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Níveis</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
              <SelectItem value="Profissional">Profissional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
