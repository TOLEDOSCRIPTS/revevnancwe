'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Music, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GlobalMusicPlayer() {
  const [mounted, setMounted] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const { currentMusic, isPlaying, setMusic, setIsPlaying } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !currentMusic || !isPlaying) return null

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg shadow-2xl transition-all duration-300 ${
        minimized ? 'w-12 h-12' : 'w-80'
      }`}
    >
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="w-full h-full flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg"
        >
          <Music className="w-5 h-5" />
        </button>
      ) : (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Music className="w-4 h-4 text-primary" />
              <span className="font-medium">Now Playing</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setMinimized(true)}
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive"
                onClick={() => {
                  setMusic(null)
                  setIsPlaying(false)
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="aspect-video rounded overflow-hidden bg-secondary">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentMusic}?autoplay=1&loop=1`}
              title="Background Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        </div>
      )}
    </div>
  )
}
