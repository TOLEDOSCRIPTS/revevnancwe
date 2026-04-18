'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Music, Play, Square, ExternalLink } from 'lucide-react'

interface MusicPlayerProps {
  onBack: () => void
}

// Extract video ID from various YouTube URL formats
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function MusicPlayer({ onBack }: MusicPlayerProps) {
  const { currentMusic, isPlaying, setMusic, setIsPlaying } = useStore()
  const [inputUrl, setInputUrl] = useState(currentMusic || '')
  const [error, setError] = useState('')

  const handleSetMusic = () => {
    if (!inputUrl.trim()) {
      setError('Please enter a YouTube URL')
      return
    }

    const videoId = extractYouTubeId(inputUrl.trim())
    if (!videoId) {
      setError('Invalid YouTube URL. Please use a valid YouTube link.')
      return
    }

    setError('')
    setMusic(videoId)
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setMusic(null)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">Music Player</CardTitle>
              <p className="text-sm text-muted-foreground">Play YouTube music on the tier list</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <div className="flex gap-2">
              <Input
                id="youtube-url"
                placeholder="https://youtube.com/watch?v=... or video ID"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value)
                  setError('')
                }}
                className="flex-1"
              />
              <Button onClick={handleSetMusic} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Play
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          {currentMusic && isPlaying && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Now Playing</span>
                <Button variant="destructive" size="sm" onClick={handleStop} className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              </div>
              
              <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentMusic}?autoplay=1&loop=1`}
                  title="YouTube music player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Quick Links</h4>
          <div className="flex flex-wrap gap-2">
            <a 
              href="https://www.youtube.com/results?search_query=minecraft+music" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Minecraft Music
            </a>
            <a 
              href="https://www.youtube.com/results?search_query=lofi+gaming" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Lofi Gaming
            </a>
            <a 
              href="https://www.youtube.com/results?search_query=pvp+montage+music" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              PvP Montage Music
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
