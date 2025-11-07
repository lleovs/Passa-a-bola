"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface UpcomingGame {
  id: string
  time: string
  competition: string
  team1: {
    name: string
    logo: string
  }
  team2: {
    name: string
    logo: string
  }
}

const upcomingGames: UpcomingGame[] = [
  {
    id: "1",
    time: "Hoje, 16:00",
    competition: "Brasileirão Feminino",
    team1: {
      name: "Corinthians",
      logo: "/ancient-corinth.png",
    },
    team2: {
      name: "Palmeiras",
      logo: "/palmeiras-football-team.png",
    },
  },
  {
    id: "2",
    time: "Amanhã, 19:30",
    competition: "Copa Libertadores Feminina",
    team1: {
      name: "Santos",
      logo: "/santos-statues.png",
    },
    team2: {
      name: "Flamengo",
      logo: "/flamengo-scarf.png",
    },
  },
]

export function UpcomingGames() {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold text-primary">Próximos Jogos</h2>

      <div className="mt-4 space-y-4">
        {upcomingGames.map((game) => (
          <div key={game.id} className="rounded-lg bg-accent/50 p-4">
            <div className="mb-3">
              <div className="text-sm font-semibold text-primary">{game.time}</div>
              <div className="text-xs text-muted-foreground">{game.competition}</div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={game.team1.logo || "/placeholder.svg"} alt={game.team1.name} />
                  <AvatarFallback>{game.team1.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{game.team1.name}</span>
              </div>

              <span className="text-sm font-bold text-primary">VS</span>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{game.team2.name}</span>
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={game.team2.logo || "/placeholder.svg"} alt={game.team2.name} />
                  <AvatarFallback>{game.team2.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full gap-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Bell className="h-4 w-4" />
              Notificar-me
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
