'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { TIERS, type Player } from '@/lib/types'
import { TierRow } from './tier-row'
import { PlayerInfoPanel } from './player-info-panel'

interface TierListProps {
  isAdmin?: boolean
  onEditPlayer?: (player: Player) => void
}

export function TierList({ isAdmin = false, onEditPlayer }: TierListProps) {
  const [mounted, setMounted] = useState(false)
  const { players, selectedPlayerId } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="space-y-3">
        {TIERS.map((tier) => (
          <div key={tier} className="h-20 rounded-lg bg-secondary/30 animate-pulse" />
        ))}
      </div>
    )
  }

  const getPlayersForTier = (tier: string) => {
    return players.filter((p) => p.tier === tier)
  }

  return (
    <div className="space-y-3">
      {TIERS.map((tier) => (
        <TierRow
          key={tier}
          tier={tier}
          players={getPlayersForTier(tier)}
          isAdmin={isAdmin}
          onEditPlayer={onEditPlayer}
        />
      ))}
      
      {/* Player Info Modal for non-admin users */}
      {!isAdmin && selectedPlayerId && <PlayerInfoPanel />}
    </div>
  )
}
