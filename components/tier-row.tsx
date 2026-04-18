'use client'

import { PlayerCard } from './player-card'
import { TIER_CONFIG, type TierLevel, type Player } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TierRowProps {
  tier: TierLevel
  players: Player[]
  isAdmin?: boolean
  onEditPlayer?: (player: Player) => void
}

const tierColorMap: Record<TierLevel, string> = {
  'HT1': 'bg-tier-ht1',
  'LT1': 'bg-tier-lt1',
  'HT2': 'bg-tier-ht2',
  'LT2': 'bg-tier-lt2',
  'HT3': 'bg-tier-ht3',
  'LT3': 'bg-tier-lt3',
  'HT4': 'bg-tier-ht4',
  'LT4': 'bg-tier-lt4',
  'HT5': 'bg-tier-ht5',
  'LT5': 'bg-tier-lt5',
}

export function TierRow({ tier, players, isAdmin = false, onEditPlayer }: TierRowProps) {
  const config = TIER_CONFIG[tier]
  
  return (
    <div className="flex gap-2 min-h-[80px]">
      <div
        className={cn(
          'w-20 md:w-28 shrink-0 rounded-lg flex flex-col items-center justify-center p-2 text-foreground font-bold shadow-lg',
          tierColorMap[tier]
        )}
      >
        <span className="text-lg md:text-xl">{tier}</span>
        <span className="text-[10px] md:text-xs opacity-80 text-center leading-tight hidden md:block">
          {config.description.split(' - ')[0]}
        </span>
      </div>
      <div className="flex-1 bg-secondary/30 rounded-lg p-2 min-h-[80px]">
        <div className="flex flex-wrap gap-2">
          {players.length === 0 ? (
            <div className="text-muted-foreground text-sm italic p-2">No players</div>
          ) : (
            players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isAdmin={isAdmin}
                onEdit={() => onEditPlayer?.(player)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
