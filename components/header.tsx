'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Shield, Sword } from 'lucide-react'
import { useHydration } from '@/hooks/use-hydration'

export function Header() {
  const hydrated = useHydration()
  const { adminSession } = useStore()

  // Don't render admin state until hydrated to prevent mismatch
  const isLoggedIn = hydrated && adminSession.isLoggedIn

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sword className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Fable SMP</h1>
            <p className="text-xs text-muted-foreground">Tier List</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Admin Online
              </span>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
