'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { KitIcon } from './kit-icons'
import { useStore } from '@/lib/store'
import type { Player } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PlayerCardProps {
  player: Player
  isAdmin?: boolean
  onEdit?: () => void
}

export function PlayerCard({ player, isAdmin = false, onEdit }: PlayerCardProps) {
  const { setSelectedPlayer, selectedPlayerId, customKitInfo } = useStore()
  const isSelected = selectedPlayerId === player.id

  const handleClick = () => {
    if (isAdmin && onEdit) {
      onEdit()
    } else {
      setSelectedPlayer(isSelected ? null : player.id)
    }
  }

  // MC-Heads provides real Minecraft skins by username
  const skinUrl = `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/40`

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'p-3 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2',
        'bg-card hover:bg-secondary/50',
        isSelected && 'border-primary ring-2 ring-primary/50',
        !isSelected && 'border-border hover:border-primary/50'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded overflow-hidden bg-secondary flex-shrink-0">
          <Image
            src={skinUrl}
            alt={`${player.name}'s skin`}
            width={40}
            height={40}
            className="w-full h-full object-cover pixelated"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            {player.kits.slice(0, 4).map((kit) => (
              <div
                key={kit}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={customKitInfo[kit]?.label || kit}
              >
                <KitIcon kit={kit} size={16} />
              </div>
            ))}
            {player.kits.length > 4 && (
              <span className="text-xs text-muted-foreground">+{player.kits.length - 4}</span>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="text-xs text-muted-foreground">
            Click to edit
          </div>
        )}
      </div>
    </Card>
  )
}
