'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { KitIcon } from '@/components/kit-icons'
import { useStore } from '@/lib/store'
import { ALL_KITS, DEFAULT_KIT_INFO, type KitType } from '@/lib/types'
import { ArrowLeft, Swords, Pencil, RotateCcw, Save, X } from 'lucide-react'

interface KitManagerProps {
  onBack: () => void
}

export function KitManager({ onBack }: KitManagerProps) {
  const { customKitInfo, updateKitInfo, resetKitInfo, resetAllKitInfo } = useStore()
  const [editingKit, setEditingKit] = useState<KitType | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const startEditing = (kit: KitType) => {
    setEditingKit(kit)
    const kitInfo = customKitInfo[kit] || DEFAULT_KIT_INFO[kit as keyof typeof DEFAULT_KIT_INFO]
    setEditName(kitInfo?.label || kit)
    setEditDescription(kitInfo?.description || '')
  }

  const cancelEditing = () => {
    setEditingKit(null)
    setEditName('')
    setEditDescription('')
  }

  const saveEditing = () => {
    if (editingKit) {
      const defaultInfo = DEFAULT_KIT_INFO[editingKit as keyof typeof DEFAULT_KIT_INFO]
      updateKitInfo(editingKit, {
        label: editName.trim() || defaultInfo?.label || editingKit,
        description: editDescription.trim() || defaultInfo?.description || '',
      })
      cancelEditing()
    }
  }

  const handleReset = (kit: KitType) => {
    resetKitInfo(kit)
    if (editingKit === kit) {
      cancelEditing()
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Swords className="w-5 h-5 text-primary" />
                Kit Manager
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Customize kit names and descriptions
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetAllKitInfo}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click on any kit to edit its display name and description. Changes will be reflected throughout the tier list.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_KITS.map((kit) => {
              const kitInfo = customKitInfo[kit] || DEFAULT_KIT_INFO[kit as keyof typeof DEFAULT_KIT_INFO]
              const defaultInfo = DEFAULT_KIT_INFO[kit as keyof typeof DEFAULT_KIT_INFO]
              const isEditing = editingKit === kit
              const isModified = defaultInfo && (kitInfo.label !== defaultInfo.label || 
                                 kitInfo.description !== defaultInfo.description)

              return (
                <div
                  key={kit}
                  className={`p-4 rounded-lg border transition-all ${
                    isEditing 
                      ? 'bg-primary/10 border-primary' 
                      : isModified 
                        ? 'bg-secondary/30 border-primary/50' 
                        : 'bg-secondary/30 border-border hover:border-primary/50'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                          <KitIcon kit={kit} size={28} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`name-${kit}`} className="text-xs text-muted-foreground">Kit Name</Label>
                          <Input
                            id={`name-${kit}`}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 bg-input border-border"
                            placeholder={defaultInfo?.label || kit}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`desc-${kit}`} className="text-xs text-muted-foreground">Description</Label>
                        <Textarea
                          id={`desc-${kit}`}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="bg-input border-border resize-none"
                          rows={2}
                          placeholder={defaultInfo?.description || ''}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={saveEditing} className="flex-1">
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleReset(kit)}
                          title="Reset to default"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="cursor-pointer group"
                      onClick={() => startEditing(kit)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                          <KitIcon kit={kit} size={28} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{kitInfo.label}</h4>
                            {isModified && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                                Modified
                              </span>
                            )}
                            <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {kitInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground mb-2">Kit Categories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-secondary/20">
                <span className="font-medium text-foreground">Melee Weapons:</span>
                <span className="text-muted-foreground ml-2">Sword, Axe, Mace, Spear, Trident</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/20">
                <span className="font-medium text-foreground">Ranged Weapons:</span>
                <span className="text-muted-foreground ml-2">Bow, Crossbow</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/20">
                <span className="font-medium text-foreground">PvP Styles:</span>
                <span className="text-muted-foreground ml-2">Crystal, Anchor, Shield</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/20">
                <span className="font-medium text-foreground">Utility:</span>
                <span className="text-muted-foreground ml-2">Potion, Elytra</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
