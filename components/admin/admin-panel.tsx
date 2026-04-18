'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TierList } from '@/components/tier-list'
import { PlayerEditor } from './player-editor'
import { ChangePassword } from './change-password'
import { KitManager } from './kit-manager'
import { ThemeSelector } from './theme-selector'
import { MusicPlayer } from './music-player'
import type { Player } from '@/lib/types'
import { 
  LogOut, 
  UserPlus, 
  Key, 
  Shield, 
  Users, 
  Clock,
  Swords,
  Palette,
  Music
} from 'lucide-react'

type AdminView = 'dashboard' | 'change-password' | 'kit-manager' | 'theme-selector' | 'music-player'

export function AdminPanel() {
  const { logout, adminSession, players } = useStore()
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [isAddingPlayer, setIsAddingPlayer] = useState(false)
  const [currentView, setCurrentView] = useState<AdminView>('dashboard')

  const loginTime = adminSession.loginTime
    ? new Date(adminSession.loginTime).toLocaleTimeString()
    : 'Unknown'

  if (currentView === 'change-password') {
    return <ChangePassword onBack={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'kit-manager') {
    return <KitManager onBack={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'theme-selector') {
    return <ThemeSelector onBack={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'music-player') {
    return <MusicPlayer onBack={() => setCurrentView('dashboard')} />
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-foreground">Admin Panel</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Logged in at {loginTime}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('kit-manager')}
                className="flex items-center gap-2"
              >
                <Swords className="w-4 h-4" />
                Kits
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('theme-selector')}
                className="flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Theme
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('music-player')}
                className="flex items-center gap-2"
              >
                <Music className="w-4 h-4" />
                Music
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('change-password')}
                className="flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                Password
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{players.length}</p>
                <p className="text-sm text-muted-foreground">Total Players</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-tier-ht1 flex items-center justify-center text-foreground font-bold text-sm">T1</div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {players.filter(p => p.tier === 'HT1' || p.tier === 'LT1').length}
                </p>
                <p className="text-sm text-muted-foreground">Tier 1 Players</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-tier-ht3 flex items-center justify-center text-foreground font-bold text-sm">T3</div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {players.filter(p => p.tier === 'HT3' || p.tier === 'LT3').length}
                </p>
                <p className="text-sm text-muted-foreground">Tier 3 Players</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-tier-lt5 flex items-center justify-center text-foreground font-bold text-sm">T5</div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {players.filter(p => p.tier === 'HT5' || p.tier === 'LT5').length}
                </p>
                <p className="text-sm text-muted-foreground">Tier 5 Players</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Player Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsAddingPlayer(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add New Player
        </Button>
      </div>

      {/* Tier List (Admin Mode) */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Player Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on any player card to edit their details
          </p>
        </CardHeader>
        <CardContent>
          <TierList
            isAdmin={true}
            onEditPlayer={(player) => setEditingPlayer(player)}
          />
        </CardContent>
      </Card>

      {/* Player Editor Modal */}
      {editingPlayer && (
        <PlayerEditor
          player={editingPlayer}
          onClose={() => setEditingPlayer(null)}
        />
      )}

      {/* Add Player Modal */}
      {isAddingPlayer && (
        <PlayerEditor
          isNewPlayer
          onClose={() => setIsAddingPlayer(false)}
        />
      )}
    </div>
  )
}
