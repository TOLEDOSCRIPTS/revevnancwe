'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { THEME_PRESETS } from '@/lib/types'
import { useHydration } from '@/hooks/use-hydration'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const hydrated = useHydration()
  const currentTheme = useStore((state) => state.currentTheme)

  useEffect(() => {
    if (!hydrated) return
    
    const theme = THEME_PRESETS[currentTheme]
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary)
      document.documentElement.style.setProperty('--background', theme.background)
      document.documentElement.style.setProperty('--card', theme.card)
      document.documentElement.style.setProperty('--accent', theme.accent)
    }
  }, [currentTheme, hydrated])

  return <>{children}</>
}
