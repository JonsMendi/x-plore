import { CanvasTexture, RepeatWrapping } from 'three'

export type TextureTheme = 'stone' | 'moss' | 'sand' | 'ice' | 'ember'
type TextureVariant = 'wall' | 'floor'

type ThemeColors = {
  base: string
  accent: string
  detail: string
}

const themePalette: Record<TextureTheme, ThemeColors> = {
  stone: { base: '#5f6269', accent: '#80858f', detail: '#444954' },
  moss: { base: '#3f5f43', accent: '#6d925f', detail: '#2d4231' },
  sand: { base: '#9a8661', accent: '#c6a870', detail: '#6f5d43' },
  ice: { base: '#648a9c', accent: '#9fd1df', detail: '#3d5562' },
  ember: { base: '#5d403e', accent: '#a35546', detail: '#2e2222' },
}

export function createLevelTexture(theme: TextureTheme, variant: TextureVariant): CanvasTexture {
  const palette = themePalette[theme]
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    const fallback = new CanvasTexture(canvas)
    return fallback
  }

  // Base fill
  ctx.fillStyle = palette.base
  ctx.fillRect(0, 0, size, size)

  // Checker overlay
  const cell = variant === 'wall' ? 16 : 24
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      const checker = (x / cell + y / cell) % 2 === 0
      ctx.fillStyle = checker ? palette.accent : palette.base
      ctx.fillRect(x, y, cell, cell)
    }
  }

  // Detail noise lines
  ctx.strokeStyle = palette.detail
  ctx.globalAlpha = variant === 'wall' ? 0.35 : 0.2
  for (let i = 0; i < 45; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const len = 4 + Math.random() * 12
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + len, y + (Math.random() - 0.5) * 4)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  const texture = new CanvasTexture(canvas)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(variant === 'wall' ? 1 : 12, variant === 'wall' ? 2 : 12)
  texture.needsUpdate = true

  return texture
}

