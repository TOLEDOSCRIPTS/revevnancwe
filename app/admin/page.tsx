'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Header } from '@/components/header'
import { LoginForm } from '@/components/admin/login-form'
import { AdminPanel } from '@/components/admin/admin-panel'
import { FableThemeApplier } from '@/components/fable-theme-applier'
import { GlobalMusicPlayer } from '@/components/global-music-player'

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const { adminSession } = useStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!adminSession.isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <FableThemeApplier />
        <GlobalMusicPlayer />
        <Header />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <FableThemeApplier />
      <GlobalMusicPlayer />
      <Header />
      <main className="container px-4 md:px-6 py-8">
        <AdminPanel />
      </main>
    </div>
  )
}
