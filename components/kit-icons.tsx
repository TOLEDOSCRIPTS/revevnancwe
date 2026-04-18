'use client'

// Available icon types for kits
export const ICON_OPTIONS = [
  'sword', 'axe', 'crystal', 'anchor', 'bow', 'shield', 'trident', 'mace', 'spear',
  'crossbow', 'potion', 'elytra', 'pickaxe', 'shovel', 'hoe', 'fishing_rod',
  'flint_steel', 'shears', 'bucket', 'totem', 'ender_pearl', 'firework',
  'tnt', 'skull', 'heart', 'star', 'lightning', 'flame', 'snowflake', 'wind'
] as const

export type IconType = typeof ICON_OPTIONS[number]

interface KitIconProps {
  kit: string
  icon?: string
  className?: string
  size?: number
}

export function KitIcon({ kit, icon, className = '', size = 24 }: KitIconProps) {
  const iconStyle = { width: size, height: size }
  const iconKey = icon || kit
  
  const icons: Record<string, JSX.Element> = {
    sword: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M6.92 5H5L14 14l1.5-1.5L6.92 5zM4 3l4 4 8-8 4 4-8 8 4 4-1.5 1.5-4-4-4.5 4.5V16H4.5l4.5-4.5L5 7.5 3 8V3h1z"/>
        <path d="M2.5 21.5L6 18l1.5 1.5-3.5 3.5z"/>
      </svg>
    ),
    axe: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2L4 6v4c0 5.5 3.8 10.7 8 12 .5-.15 1-.35 1.5-.55L12 20l-6-6 6-6v-1.5L6 10V7l6-3V2z"/>
        <path d="M14 4l6 6-8 8-2-2 6-6-4-4 2-2z"/>
      </svg>
    ),
    crystal: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2L3 7l9 15 9-15-9-5zm0 3.5L17 9l-5 8.5L7 9l5-3.5z"/>
        <path d="M12 6l3.5 2L12 14l-3.5-6L12 6z" opacity="0.5"/>
      </svg>
    ),
    anchor: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2a3 3 0 00-3 3c0 1.3.8 2.4 2 2.8V9H8v2h3v8.9c-3.5-.5-6-3.5-6-7V11H3v2c0 4.6 4 8.5 8.5 9h1c4.5-.5 8.5-4.4 8.5-9v-2h-2v1.9c0 3.5-2.5 6.5-6 7V11h3V9h-3V7.8c1.2-.4 2-1.5 2-2.8a3 3 0 00-3-3zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
      </svg>
    ),
    bow: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M4 2c0 2.8 1.5 5.5 4 7l-2 2c-1.5-1-2.5-2-3-3v2c1 1.5 2.5 3 4.5 4L3 18.5 4.5 20 9 15.5c1 .3 2 .5 3 .5V4C8.7 4 5.5 2.5 4 2z"/>
        <path d="M21 12l-8 8v-3l5-5H12V9h6l-5-5V1l8 8-2 1.5 2 1.5z"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 3.2l6 2.7v5c0 4-2.8 7.8-6 8.9V4.2z"/>
      </svg>
    ),
    trident: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2l-4 6h2v14h4V8h2l-4-6zM6 3l2 4H6L4 5l2-2zm12 0l2 2-2 2h-2l2-4z"/>
        <path d="M11 8h2v5h-2z" opacity="0.5"/>
      </svg>
    ),
    mace: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M5 20.5L2 23.5l1 1 3-3-1-1zm6-5l-3 3 1 1 3-3-1-1z"/>
        <path d="M19 2L9 12l1 1-1 1 3 3 1-1 1 1L24 7l-5-5zm0 3l2 2-7 7-2-2 7-7z"/>
        <circle cx="17" cy="5" r="1.5"/>
        <circle cx="20" cy="8" r="1.5"/>
        <circle cx="15" cy="7" r="1"/>
      </svg>
    ),
    spear: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M19 2l-7 7-1-1-8 8 2 2-3 4 4-3 2 2 8-8-1-1 7-7-3-3zm-5 9l-6 6-1-1 6-6 1 1z"/>
        <path d="M20 3l1 1-6 6-1-1 6-6z"/>
      </svg>
    ),
    crossbow: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M4 4c1.5 1.5 2.5 3.5 2.5 6h3L12 7.5V4c-3 0-5.5 1-8 0z"/>
        <path d="M20 4c-2.5 1-5 0-8 0v3.5L14.5 10h3c0-2.5 1-4.5 2.5-6z"/>
        <path d="M9.5 10H7.5L12 16l4.5-6h-2l-2.5 3.5L9.5 10z"/>
        <path d="M11 16h2v6h-2z"/>
      </svg>
    ),
    potion: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M9 2v4H7l-2 3v9c0 2 2 4 4 4h6c2 0 4-2 4-4V9l-2-3h-2V2H9zm0 2h6v2H9V4zm-2 5h10l1 1.5V18c0 1-1 2-2 2H8c-1 0-2-1-2-2v-7.5L7 9z"/>
        <path d="M10 12a2 2 0 100 4 2 2 0 000-4z" opacity="0.5"/>
      </svg>
    ),
    elytra: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2L8 6C5 9 3 13 3 17l3 3c4-2 7-5 9-9l-3-3V2z"/>
        <path d="M12 2l4 4c3 3 5 7 5 11l-3 3c-4-2-7-5-9-9l3-3V2z"/>
        <path d="M10 10h4l-2 4-2-4z" opacity="0.5"/>
      </svg>
    ),
    pickaxe: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M14.79 2.62L4.15 13.26l1.41 1.41L16.2 4.03l-1.41-1.41zm5.66 5.66L9.79 18.94l1.41 1.41L21.86 9.69l-1.41-1.41z"/>
        <path d="M19.04 7.15l-2.12-2.12 1.41-1.41 2.12 2.12-1.41 1.41zM2.61 21.39l2.83-2.83 1.41 1.41-2.83 2.83-1.41-1.41z"/>
      </svg>
    ),
    shovel: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M15.1 1.81l-4.24 4.24 7.07 7.07 4.24-4.24-7.07-7.07zm-2.83 5.66l2.83-2.83 4.24 4.24-2.83 2.83-4.24-4.24z"/>
        <path d="M2.81 16.95L7.05 21.19l5.66-5.66-4.24-4.24-5.66 5.66z"/>
      </svg>
    ),
    hoe: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M4 2v6h2V4h2V2H4zm12 0v2h2v4h2V2h-4zM2 20v2h4v-2H4v-4H2v4zm18-4v4h-2v2h4v-6h-2z"/>
        <path d="M14 7l-4 4 3 3 4-4-3-3z"/>
        <path d="M6 17l4-4 3 3-4 4-3-3z"/>
      </svg>
    ),
    fishing_rod: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M17 2l-3 3v6l3-3V2z"/>
        <path d="M14 8l-4 4 2 2 4-4-2-2z"/>
        <path d="M8 14c-1.5 1.5-2 4-1 6s4 2 6 1l-5-5v-2z"/>
        <circle cx="5" cy="19" r="2"/>
      </svg>
    ),
    flint_steel: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M15 2c-1 0-2 1-2 2v6c0 1 1 2 2 2h2c1 0 2-1 2-2V4c0-1-1-2-2-2h-2z"/>
        <path d="M7 8l-2 6 4 8 4-8-2-6H7zm2 3h2l1 3-2 4-2-4 1-3z"/>
      </svg>
    ),
    shears: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2l-2 8 2 2 2-2-2-8z"/>
        <circle cx="6" cy="18" r="4"/>
        <circle cx="18" cy="18" r="4"/>
        <path d="M8 14l4 4 4-4"/>
      </svg>
    ),
    bucket: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M7 4h10v2H7V4z"/>
        <path d="M5 8h14l-2 14H7L5 8zm3 2l1.5 10h5L16 10H8z"/>
      </svg>
    ),
    totem: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2L8 6v4l4 2 4-2V6l-4-4zm0 2.5L14 6v2.5l-2 1-2-1V6l2-1.5z"/>
        <path d="M8 13l-3 3v4l3 2 4-2 4 2 3-2v-4l-3-3H8zm4 2l3 2v2l-3 1.5L9 19v-2l3-2z"/>
      </svg>
    ),
    ender_pearl: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="5" opacity="0.5"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    firework: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2v8l-2 2v4l2 6 2-6v-4l-2-2V2z"/>
        <path d="M8 8l2 2-2 2v3l-4 2 4-5V8z"/>
        <path d="M16 8l-2 2 2 2v3l4 2-4-5V8z"/>
        <circle cx="12" cy="4" r="1.5"/>
      </svg>
    ),
    tnt: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <rect x="4" y="6" width="16" height="14" rx="1"/>
        <path d="M12 2v4m-4-2h8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold">TNT</text>
      </svg>
    ),
    skull: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2C7 2 3 6 3 11v4c0 2 1 3 2 4v3h4v-2h6v2h4v-3c1-1 2-2 2-4v-4c0-5-4-9-9-9zm-3 9a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4z"/>
        <path d="M10 17h4v1h-4z"/>
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    lightning: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M13 2L4 14h7l-2 8 11-12h-7l2-8z"/>
      </svg>
    ),
    flame: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M12 2C9 6 7 8 7 12c0 2.8 2.2 5 5 5s5-2.2 5-5c0-4-2-6-5-10zm0 13c-1.1 0-2-.9-2-2 0-1.5 1-2.5 2-4 1 1.5 2 2.5 2 4 0 1.1-.9 2-2 2z"/>
      </svg>
    ),
    snowflake: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M11 1v4l-2-2-1.5 1.5L11 8v3H8l-3.5-3.5L3 9l2 2H1v2h4l-2 2 1.5 1.5L8 13h3v3l-3.5 3.5L9 21l2-2v4h2v-4l2 2 1.5-1.5L13 16v-3h3l3.5 3.5L21 15l-2-2h4v-2h-4l2-2-1.5-1.5L16 11h-3V8l3.5-3.5L15 3l-2 2V1h-2z"/>
      </svg>
    ),
    wind: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} className={className}>
        <path d="M4 10h11a3 3 0 100-3M4 14h14a3 3 0 110 3M4 18h7a2 2 0 110 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  }
  
  return icons[iconKey] || icons['sword'] || null
}
