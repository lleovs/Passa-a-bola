"use client"

import { MapPin, Calendar, Users, DollarSign, Bell } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/lib/storage"

interface GameCardProps {
  game: Game
  onNotify?: (gameId: string) => void
}

export function GameCard({ game, onNotify }: GameCardProps) {
  const statusColors = {
    Aberto: "bg-primary text-primary-foreground",
    Lotado: "bg-yellow-500 text-white",
  }

  return (
    <Card className="p-6 card-entrance card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <Badge className={statusColors[game.status]}>{game.status}</Badge>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={game.organizer.avatar || "/placeholder.svg"} alt={game.organizer.name} />
              <AvatarFallback>{game.organizer.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">por {game.organizer.name}</span>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                {game.date} às {game.time}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{game.location}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{game.participants}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>{game.price}</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{game.description}</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex -space-x-2">
              {game.attendees.slice(0, 3).map((attendee, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              +{game.attendees.length > 3 ? game.attendees.length - 3 : 0}
            </span>
            <Badge variant="outline" className="ml-auto">
              {game.level}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-transition btn-hover-lift"
          disabled={game.status === "Lotado"}
        >
          + Participar
        </Button>
        {game.status === "Aberto" && (
          <Button
            variant="outline"
            className="gap-2 border-primary text-primary hover:bg-primary/10 bg-transparent btn-transition btn-hover-lift"
            onClick={() => onNotify?.(game.id)}
          >
            <Bell className="h-4 w-4 icon-bounce-hover" />
            Notificar-me
          </Button>
        )}
      </div>
    </Card>
  )
}
