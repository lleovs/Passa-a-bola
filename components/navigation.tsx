"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Bell, Mail, Gamepad2, User, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const { toggleTheme, theme } = useTheme()

  const navItems = [
    { href: "/", label: "Início", icon: Home, active: pathname === "/" },
    {
      href: "/explorar",
      label: "Explorar",
      icon: Search,
      active: pathname === "/explorar",
    },
    {
      href: "/notificacoes",
      label: "Notificações",
      icon: Bell,
      active: pathname === "/notificacoes",
    },
    {
      href: "/mensagens",
      label: "Mensagens",
      icon: Mail,
      active: pathname === "/mensagens",
    },
    {
      href: "/jogos",
      label: "Jogos",
      icon: Gamepad2,
      active: pathname === "/jogos",
    },
    {
      href: "/perfil",
      label: "Perfil",
      icon: User,
      active: pathname === "/perfil",
    },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary smooth-transition hover:scale-105">
              FutFem
              <span className="block text-sm font-semibold leading-none">Social</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="default"
                  className={cn(
                    "gap-2 btn-transition",
                    item.active
                      ? "bg-primary text-primary-foreground btn-hover-glow"
                      : "hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4 icon-bounce-hover" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 btn-transition btn-hover-lift"
            >
              <Moon className="h-5 w-5 smooth-transition hover:rotate-12" />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
