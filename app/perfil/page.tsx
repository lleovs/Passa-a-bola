"use client"

import { AppLayout } from "@/components/app-layout"
import { Card } from "@/components/ui/card"

export default function PerfilPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold">Perfil</h1>
          <p className="mt-4 text-muted-foreground">Esta página está em desenvolvimento.</p>
        </Card>
      </div>
    </AppLayout>
  )
}
