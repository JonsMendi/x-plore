import { thunderSounds } from '@/components/3D/Thunder'
import { makeAutoObservable } from 'mobx'
import type { RefObject } from 'react'

class GameStore {
  sceneLoaded = false
  startTimer = false
  gameStarted = false
  resetTimer: (() => void) | null = null
  resetLevel: (() => void) | null = null
  hover = false
  isPaused = false
  audioRef: RefObject<HTMLAudioElement> | null = null
  thunderAudioRefs: HTMLAudioElement[] = []

  isAudioPlaying = false

  constructor() {
    makeAutoObservable(this)
  }

  initThunderAudio = () => {
    if (typeof window === 'undefined') return
    if (this.thunderAudioRefs.length) return

    this.thunderAudioRefs = thunderSounds.map((src) => {
      const a = new Audio(src)
      a.preload = 'auto'
      return a
    })
  }

  stopAllThunder = () => {
    this.thunderAudioRefs.forEach((a) => {
      a.pause()
      a.currentTime = 0
    })
  }

  setSceneLoaded = (loaded: boolean) => {
    this.sceneLoaded = loaded
  }

  setStartTimer = (start: boolean) => {
    this.startTimer = start
  }

  setGameStarted = (started: boolean) => {
    this.gameStarted = started
  }

  setResetTimer = (resetFn?: () => void) => {
    this.resetTimer = resetFn ?? null
  }

  setResetLevel = (resetFn?: () => void) => {
    this.resetLevel = resetFn ?? null
  }

  setHover = (isHovering: boolean) => {
    this.hover = isHovering
  }

  setPaused = (paused: boolean) => {
    this.isPaused = paused
  }

  togglePause = () => {
    this.isPaused = !this.isPaused
  }

  startGame = () => {
    this.setGameStarted(true)
  }

  handleSceneLoaded = () => {
    this.setSceneLoaded(true)
    this.setStartTimer(true)
  }

  setAudioPlaying = (isPlaying: boolean) => {
    this.isAudioPlaying = isPlaying
  }
}

export const gameStore = new GameStore()
