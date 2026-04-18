'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { THEME_PRESETS } from '@/lib/types'

export function FableThemeApplier() {
  const [mounted, setMounted] = useState(false)
  const { currentTheme } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const theme = THEME_PRESETS[currentTheme]
    if (!theme) return

    const root = document.documentElement
    
    // Apply theme colors as CSS variables
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--background', theme.background)
    root.style.setProperty('--card', theme.card)
    root.style.setProperty('--accent', theme.accent)
    
    // Also update derived colors
    root.style.setProperty('--secondary', theme.card)
    root.style.setProperty('--popover', theme.card)
    root.style.setProperty('--muted', theme.card)
    root.style.setProperty('--ring', theme.primary)
    root.style.setProperty('--sidebar', theme.background)
    root.style.setProperty('--sidebar-primary', theme.primary)
    root.style.setProperty('--sidebar-accent', theme.card)
    
  }, [currentTheme, mounted])

  return null
}
