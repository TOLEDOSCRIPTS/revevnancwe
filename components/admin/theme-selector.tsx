'use client'

import { useStore } from '@/lib/store'
import { THEME_PRESETS, type ThemePreset } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeSelectorProps {
  onBack: () => void
}

export function ThemeSelector({ onBack }: ThemeSelectorProps) {
  const { currentTheme, setTheme } = useStore()

  const themes = Object.entries(THEME_PRESETS) as [ThemePreset, typeof THEME_PRESETS[ThemePreset]][]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Theme Selector</CardTitle>
              <p className="text-sm text-muted-foreground">Choose a color theme for the tier list</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={cn(
                'relative p-4 rounded-lg border-2 transition-all text-left',
                currentTheme === key 
                  ? 'border-primary ring-2 ring-primary/30' 
                  : 'border-border hover:border-primary/50'
              )}
              style={{
                background: theme.background,
              }}
            >
              {currentTheme === key && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ background: theme.primary }}
                  />
                  <span className="font-semibold text-foreground">{theme.name}</span>
                </div>
                <div className="flex gap-2">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ background: theme.primary }}
                    title="Primary"
                  />
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ background: theme.card }}
                    title="Card"
                  />
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ background: theme.accent }}
                    title="Accent"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
