'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KitIcon } from '@/components/kit-icons'
import { TIERS, TIER_CONFIG, ALL_KITS, type Player, type TierLevel, type KitType } from '@/lib/types'
import { X, Save, Trash2, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlayerEditorProps {
  player?: Player | null
  onClose: () => void
  isNewPlayer?: boolean
}

export function PlayerEditor({ player, onClose, isNewPlayer = false }: PlayerEditorProps) {
  const { addPlayer, updatePlayer, deletePlayer, customKitInfo } = useStore()
  
  const [name, setName] = useState(player?.name || '')
  const [tier, setTier] = useState<TierLevel>(player?.tier || 'LT5')
  const [selectedKits, setSelectedKits] = useState<KitType[]>(player?.kits || [])
  const [notes, setNotes] = useState(player?.notes || '')
  const [joinDate, setJoinDate] = useState(player?.joinDate || new Date().toISOString().split('T')[0])
  const [error, setError] = useState('')

  useEffect(() => {
    if (player) {
      setName(player.name)
      setTier(player.tier)
      setSelectedKits(player.kits)
      setNotes(player.notes || '')
      setJoinDate(player.joinDate)
    }
  }, [player])

  const toggleKit = (kit: KitType) => {
    setSelectedKits((prev) =>
      prev.includes(kit)
        ? prev.filter((k) => k !== kit)
        : [...prev, kit]
    )
  }

  const handleSave = () => {
    setError('')
    
    if (!name.trim()) {
      setError('Player name is required')
      return
    }
    
    if (selectedKits.length === 0) {
      setError('Please select at least one kit')
      return
    }

    if (isNewPlayer) {
      addPlayer({
        name: name.trim(),
        tier,
        kits: selectedKits,
        joinDate,
        notes: notes.trim() || undefined,
      })
    } else if (player) {
      updatePlayer(player.id, {
        name: name.trim(),
        tier,
        kits: selectedKits,
        joinDate,
        notes: notes.trim() || undefined,
      })
    }
    
    onClose()
  }

  const handleDelete = () => {
    if (player && confirm(`Are you sure you want to delete ${player.name}?`)) {
      deletePlayer(player.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            {isNewPlayer ? (
              <>
                <UserPlus className="w-5 h-5 text-primary" />
                Add New Player
              </>
            ) : (
              <>Edit Player</>
            )}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Player Name</Label>
            <div className="flex items-center gap-3">
              {name && (
                <div className="w-12 h-12 rounded overflow-hidden bg-secondary shrink-0">
                  <Image
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(name)}/48`}
                    alt={`${name}'s skin`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover pixelated"
                    unoptimized
                  />
                </div>
              )}
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Minecraft username"
                className="bg-input border-border text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">Skin will load automatically from MC-Heads</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier" className="text-foreground">Tier</Label>
            <Select value={tier} onValueChange={(v) => setTier(v as TierLevel)}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {TIERS.map((t) => (
                  <SelectItem key={t} value={t} className="text-foreground">
                    <span className="flex items-center gap-2">
                      <span className={cn('w-3 h-3 rounded', TIER_CONFIG[t].colorClass)} />
                      {t} - {TIER_CONFIG[t].label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Kits (Select multiple)</Label>
            <div className="grid grid-cols-4 gap-2">
              {ALL_KITS.map((kit) => {
                const isSelected = selectedKits.includes(kit)
                const kitInfo = customKitInfo[kit]
                return (
                  <button
                    key={kit}
                    type="button"
                    onClick={() => toggleKit(kit)}
                    title={kitInfo?.description}
                    className={cn(
                      'flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
                      isSelected
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    )}
                  >
                    <KitIcon kit={kit} size={24} />
                    <span className="text-xs">{kitInfo?.label || kit}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="joinDate" className="text-foreground">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this player..."
              className="bg-input border-border text-foreground resize-none"
              rows={3}
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <div className="flex gap-2 pt-2">
            {!isNewPlayer && player && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            <div className="flex-1" />
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {isNewPlayer ? 'Add Player' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
