'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { TIER_CONFIG } from '@/lib/types'
import { KitIcon } from './kit-icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function PlayerInfoPanel() {
  const [mounted, setMounted] = useState(false)
  const { players, selectedPlayerId, setSelectedPlayer, customKitInfo } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const player = players.find((p) => p.id === selectedPlayerId)

  if (!mounted || !player) return null

  const tierConfig = TIER_CONFIG[player.tier]
  const skinUrl = `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/64`
  const bodyUrl = `https://mc-heads.net/body/${encodeURIComponent(player.name)}/100`

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl">
        <CardHeader className="relative border-b border-border pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setSelectedPlayer(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded overflow-hidden bg-secondary">
              <Image
                src={skinUrl}
                alt={`${player.name}'s skin`}
                width={64}
                height={64}
                className="w-full h-full object-cover pixelated"
                unoptimized
              />
            </div>
            <div>
              <CardTitle className="text-2xl text-foreground">{player.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-sm font-semibold ${tierConfig.colorClass} text-foreground`}>
                  {player.tier}
                </span>
                <span className="text-muted-foreground text-sm">{tierConfig.label}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {/* Full Body Render */}
          <div className="flex justify-center">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <Image
                src={bodyUrl}
                alt={`${player.name}'s full body`}
                width={100}
                height={200}
                className="pixelated"
                unoptimized
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Tier Description</h4>
            <p className="text-foreground">{tierConfig.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Kits</h4>
            <div className="flex flex-wrap gap-2">
              {player.kits.map((kit) => {
                const kitInfo = customKitInfo[kit]
                return (
                  <div
                    key={kit}
                    className="flex flex-col gap-1 bg-secondary px-3 py-2 rounded-lg"
                    title={kitInfo?.description}
                  >
                    <div className="flex items-center gap-2">
                      <KitIcon kit={kit} size={18} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{kitInfo?.label || kit}</span>
                    </div>
                    {kitInfo?.description && (
                      <span className="text-xs text-muted-foreground line-clamp-1">{kitInfo.description}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Member Since</h4>
            <p className="text-foreground">
              {new Date(player.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {player.notes && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Notes</h4>
              <p className="text-foreground bg-secondary/50 p-2 rounded">{player.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
