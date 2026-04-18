'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Key, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'

interface ChangePasswordProps {
  onBack: () => void
}

export function ChangePassword({ onBack }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { changePassword } = useStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword || !securityAnswer) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    const result = changePassword(currentPassword, newPassword, securityAnswer)
    
    if (result.success) {
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSecurityAnswer('')
      setTimeout(() => {
        onBack()
      }, 2000)
    } else {
      setError(result.error || 'Failed to change password')
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Change Password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Update your admin password
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="bg-input border-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-input border-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="bg-input border-border text-foreground"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <Label htmlFor="securityAnswer" className="text-foreground">
              Security Question: What is your pet{"'"}s name?
            </Label>
            <Input
              id="securityAnswer"
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Enter your pet's name"
              className="bg-input border-border text-foreground"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          {success && (
            <div className="flex items-center gap-2 text-primary text-sm">
              <Check className="w-4 h-4" />
              Password changed successfully! Redirecting...
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
