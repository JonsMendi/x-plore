import { gameStore } from '@/stores/GameStore'

export const toggleMusic = () => {
  const nextIsPlaying = !gameStore.isMusicPlaying
  gameStore.setMusicPlaying(nextIsPlaying)

  if (gameStore.audioRef?.current) {
    if (nextIsPlaying) {
      gameStore.audioRef.current.muted = false
      gameStore.audioRef.current.play().catch(() => {
        console.log('Autoplay blocked.')
      })
    } else {
      gameStore.audioRef.current.muted = true
      gameStore.audioRef.current.pause()
    }
  }
}

export const toggleLightning = () => {
  gameStore.initThunderAudio()
  const nextIsPlaying = !gameStore.isLightningPlaying
  if (!nextIsPlaying) {
    gameStore.stopAllThunder()
  }
  gameStore.setLightningPlaying(nextIsPlaying)
}

// Backward compatibility for previous single sound toggle.
export const toggleAudio = toggleMusic
