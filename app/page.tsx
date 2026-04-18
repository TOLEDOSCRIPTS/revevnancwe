'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { TierList } from '@/components/tier-list'
import { FableThemeApplier } from '@/components/fable-theme-applier'
import { GlobalMusicPlayer } from '@/components/global-music-player'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KitIcon } from '@/components/kit-icons'
import { useStore } from '@/lib/store'
import { ALL_KITS } from '@/lib/types'
import { Sword, Trophy, Users } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { customKitInfo } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <FableThemeApplier />
      <GlobalMusicPlayer />
      <Header />
      
      <main className="container px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-4">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
            Fable SMP Tier List
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            The official player rankings for the Fable SMP Minecraft server. 
            Click on any player to view their detailed information and kit loadouts.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Tier Rankings</h3>
                  <p className="text-sm text-muted-foreground">
                    From HT1 (best) to LT5 (new). H = High, L = Low within each tier.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Sword className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Kit System</h3>
                  <p className="text-sm text-muted-foreground">
                    Each player specializes in different combat kits like Crystal, Sword, or Anchor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Player Info</h3>
                  <p className="text-sm text-muted-foreground">
                    Click any player card to see their full profile, kits, and notes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kit Legend */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-lg flex items-center gap-2">
              <Sword className="w-5 h-5 text-primary" />
              Kit Legend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {ALL_KITS.map((kit) => {
                const kitInfo = customKitInfo[kit]
                return (
                  <div
                    key={kit}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border"
                    title={kitInfo?.description}
                  >
                    <KitIcon kit={kit} size={18} className="text-primary" />
                    <span className="text-sm text-foreground">{kitInfo?.label || kit}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tier List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Player Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TierList />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>Fable SMP Tier List - Updated regularly by server admins</p>
        </div>
      </footer>
    </div>
  )
}
