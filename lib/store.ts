'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Player, AdminSession, TierLevel, KitType, ThemePreset, KitInfo } from './types'
import { DEFAULT_KIT_INFO } from './types'

interface StoreState {
  // Players
  players: Player[]
  addPlayer: (player: Omit<Player, 'id'>) => void
  updatePlayer: (id: string, updates: Partial<Player>) => void
  deletePlayer: (id: string) => void
  
  // Admin
  adminSession: AdminSession
  adminPassword: string
  securityAnswer: string
  login: (password: string) => boolean
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string, securityAnswer: string) => { success: boolean; error?: string }
  
  // Selected player for info view
  selectedPlayerId: string | null
  setSelectedPlayer: (id: string | null) => void
  
  // Theme
  currentTheme: ThemePreset
  setTheme: (theme: ThemePreset) => void
  
  // Music
  currentMusic: string | null
  isPlaying: boolean
  setMusic: (url: string | null) => void
  setIsPlaying: (playing: boolean) => void
  
  // Kit customization
  customKitInfo: Record<KitType, KitInfo>
  updateKitInfo: (kit: KitType, updates: Partial<KitInfo>) => void
  resetKitInfo: (kit: KitType) => void
  resetAllKitInfo: () => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

// Sample players
const initialPlayers: Player[] = [
  { id: '1', name: 'DragonSlayer', tier: 'HT1', kits: ['sword', 'crystal'], joinDate: '2024-01-15', notes: 'Server champion' },
  { id: '2', name: 'CrystalMaster', tier: 'HT1', kits: ['crystal', 'anchor'], joinDate: '2024-02-20', notes: 'Best crystal player' },
  { id: '3', name: 'AxeWarrior', tier: 'LT1', kits: ['axe', 'shield'], joinDate: '2024-01-10' },
  { id: '4', name: 'BowSniper', tier: 'HT2', kits: ['bow', 'crossbow'], joinDate: '2024-03-05' },
  { id: '5', name: 'ShieldTank', tier: 'LT2', kits: ['shield', 'mace'], joinDate: '2024-02-28' },
  { id: '6', name: 'TridentKing', tier: 'HT3', kits: ['trident', 'elytra'], joinDate: '2024-04-12' },
  { id: '7', name: 'SpearMaster', tier: 'LT3', kits: ['spear', 'sword'], joinDate: '2024-03-18' },
  { id: '8', name: 'PotionWizard', tier: 'HT4', kits: ['potion', 'bow'], joinDate: '2024-05-01' },
  { id: '9', name: 'NewPlayer123', tier: 'LT4', kits: ['sword'], joinDate: '2024-06-15' },
  { id: '10', name: 'BeginnerSteve', tier: 'HT5', kits: ['axe'], joinDate: '2024-07-01' },
  { id: '11', name: 'FreshSpawn', tier: 'LT5', kits: ['sword'], joinDate: '2024-07-10' },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      players: initialPlayers,
      
      addPlayer: (player) => {
        const newPlayer: Player = {
          ...player,
          id: generateId(),
        }
        set((state) => ({ players: [...state.players, newPlayer] }))
      },
      
      updatePlayer: (id, updates) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }))
      },
      
      deletePlayer: (id) => {
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
          selectedPlayerId: state.selectedPlayerId === id ? null : state.selectedPlayerId,
        }))
      },
      
      adminSession: { isLoggedIn: false },
      adminPassword: 'fable2024', // Default password
      securityAnswer: 'burpy', // The pet name
      
      login: (password) => {
        if (password === get().adminPassword) {
          set({ adminSession: { isLoggedIn: true, loginTime: Date.now() } })
          return true
        }
        return false
      },
      
      logout: () => {
        set({ adminSession: { isLoggedIn: false } })
      },
      
      changePassword: (currentPassword, newPassword, securityAnswer) => {
        const state = get()
        if (currentPassword !== state.adminPassword) {
          return { success: false, error: 'Current password is incorrect' }
        }
        if (securityAnswer.toLowerCase() !== state.securityAnswer.toLowerCase()) {
          return { success: false, error: 'Security answer is incorrect. What is your pet\'s name?' }
        }
        if (newPassword.length < 4) {
          return { success: false, error: 'New password must be at least 4 characters' }
        }
        set({ adminPassword: newPassword })
        return { success: true }
      },
      
      selectedPlayerId: null,
      setSelectedPlayer: (id) => set({ selectedPlayerId: id }),
      
      // Theme
      currentTheme: 'fable',
      setTheme: (theme) => set({ currentTheme: theme }),
      
      // Music
      currentMusic: null,
      isPlaying: false,
      setMusic: (url) => set({ currentMusic: url }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      
      // Kit customization
      customKitInfo: { ...DEFAULT_KIT_INFO },
      updateKitInfo: (kit, updates) => {
        set((state) => ({
          customKitInfo: {
            ...state.customKitInfo,
            [kit]: { ...state.customKitInfo[kit], ...updates },
          },
        }))
      },
      resetKitInfo: (kit) => {
        set((state) => ({
          customKitInfo: {
            ...state.customKitInfo,
            [kit]: DEFAULT_KIT_INFO[kit],
          },
        }))
      },
      resetAllKitInfo: () => {
        set({ customKitInfo: { ...DEFAULT_KIT_INFO } })
      },
    }),
    {
      name: 'fable-smp-storage',
    }
  )
)
