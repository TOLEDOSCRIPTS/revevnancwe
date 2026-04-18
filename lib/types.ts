export type TierLevel = 'LT5' | 'HT5' | 'LT4' | 'HT4' | 'LT3' | 'HT3' | 'LT2' | 'HT2' | 'LT1' | 'HT1'

// Built-in kit types
export type BuiltInKitType = 
  | 'sword' 
  | 'axe' 
  | 'crystal' 
  | 'anchor' 
  | 'bow' 
  | 'shield' 
  | 'trident' 
  | 'mace' 
  | 'spear'
  | 'crossbow'
  | 'potion'
  | 'elytra'

// KitType can now be any string to support custom kits
export type KitType = string

export interface Player {
  id: string
  name: string
  tier: TierLevel
  kits: KitType[]
  joinDate: string
  notes?: string
}

export interface AdminSession {
  isLoggedIn: boolean
  loginTime?: number
}

export type ThemePreset = 'fable' | 'nether' | 'ocean' | 'ender' | 'forest' | 'crimson'

export interface ThemeConfig {
  name: string
  primary: string
  background: string
  card: string
  accent: string
}

export const THEME_PRESETS: Record<ThemePreset, ThemeConfig> = {
  fable: {
    name: 'Fable (Default)',
    primary: 'oklch(0.7 0.2 160)',
    background: 'oklch(0.13 0.02 280)',
    card: 'oklch(0.17 0.02 280)',
    accent: 'oklch(0.7 0.2 160)',
  },
  nether: {
    name: 'Nether',
    primary: 'oklch(0.65 0.25 25)',
    background: 'oklch(0.12 0.03 15)',
    card: 'oklch(0.16 0.04 15)',
    accent: 'oklch(0.75 0.2 50)',
  },
  ocean: {
    name: 'Ocean Monument',
    primary: 'oklch(0.7 0.15 220)',
    background: 'oklch(0.12 0.03 230)',
    card: 'oklch(0.16 0.03 230)',
    accent: 'oklch(0.75 0.12 180)',
  },
  ender: {
    name: 'End Dimension',
    primary: 'oklch(0.7 0.18 300)',
    background: 'oklch(0.08 0.02 280)',
    card: 'oklch(0.12 0.03 280)',
    accent: 'oklch(0.8 0.15 320)',
  },
  forest: {
    name: 'Dark Forest',
    primary: 'oklch(0.6 0.18 140)',
    background: 'oklch(0.1 0.02 140)',
    card: 'oklch(0.14 0.03 140)',
    accent: 'oklch(0.7 0.15 100)',
  },
  crimson: {
    name: 'Crimson Forest',
    primary: 'oklch(0.6 0.22 350)',
    background: 'oklch(0.11 0.03 350)',
    card: 'oklch(0.15 0.04 350)',
    accent: 'oklch(0.75 0.18 20)',
  },
}

export const TIERS: TierLevel[] = ['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5']

export const TIER_CONFIG: Record<TierLevel, { label: string; colorClass: string; description: string }> = {
  'HT1': { label: 'High Tier 1', colorClass: 'bg-tier-ht1', description: 'Elite - Top Players' },
  'LT1': { label: 'Low Tier 1', colorClass: 'bg-tier-lt1', description: 'Elite - Exceptional' },
  'HT2': { label: 'High Tier 2', colorClass: 'bg-tier-ht2', description: 'Advanced - High Skill' },
  'LT2': { label: 'Low Tier 2', colorClass: 'bg-tier-lt2', description: 'Advanced - Skilled' },
  'HT3': { label: 'High Tier 3', colorClass: 'bg-tier-ht3', description: 'Intermediate - Strong' },
  'LT3': { label: 'Low Tier 3', colorClass: 'bg-tier-lt3', description: 'Intermediate - Capable' },
  'HT4': { label: 'High Tier 4', colorClass: 'bg-tier-ht4', description: 'Developing - Improving' },
  'LT4': { label: 'Low Tier 4', colorClass: 'bg-tier-lt4', description: 'Developing - Learning' },
  'HT5': { label: 'High Tier 5', colorClass: 'bg-tier-ht5', description: 'Beginner - New' },
  'LT5': { label: 'Low Tier 5', colorClass: 'bg-tier-lt5', description: 'Beginner - Starting' },
}

export interface KitInfo {
  label: string
  icon: string
  description: string
}

export const DEFAULT_KIT_INFO: Record<KitType, KitInfo> = {
  'sword': { label: 'Sword', icon: 'sword', description: 'Classic melee combat with swift strikes and combos' },
  'axe': { label: 'Axe', icon: 'axe', description: 'Heavy damage dealer with shield-breaking capability' },
  'crystal': { label: 'Crystal PvP', icon: 'crystal', description: 'End crystal placement and detonation mastery' },
  'anchor': { label: 'Anchor', icon: 'anchor', description: 'Respawn anchor explosions for massive damage' },
  'bow': { label: 'Bow', icon: 'bow', description: 'Long-range precision shots and kiting' },
  'shield': { label: 'Shield', icon: 'shield', description: 'Defensive blocking and counter-attacks' },
  'trident': { label: 'Trident', icon: 'trident', description: 'Versatile water and riptide combat' },
  'mace': { label: 'Mace', icon: 'mace', description: 'Heavy smash attacks with wind burst' },
  'spear': { label: 'Spear', icon: 'spear', description: 'Extended reach for safe distance fighting' },
  'crossbow': { label: 'Crossbow', icon: 'crossbow', description: 'Powerful single shots with quick-charge' },
  'potion': { label: 'Potion', icon: 'potion', description: 'Splash and lingering potion specialist' },
  'elytra': { label: 'Elytra', icon: 'elytra', description: 'Aerial combat and mobility tactics' },
}

// For backward compatibility
export const KIT_INFO = DEFAULT_KIT_INFO

export const ALL_KITS: KitType[] = ['sword', 'axe', 'crystal', 'anchor', 'bow', 'shield', 'trident', 'mace', 'spear', 'crossbow', 'potion', 'elytra']
