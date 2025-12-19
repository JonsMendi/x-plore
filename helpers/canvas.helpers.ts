import { gameStore } from "@/stores/GameStore"

export const toggleAudio = () => {
  gameStore.initThunderAudio()

  const nextIsPlaying = !gameStore.isAudioPlaying

  if (gameStore.audioRef?.current) {
    if (nextIsPlaying) {
      gameStore.audioRef.current.play().catch(() => {
        console.log("Autoplay blocked.")
      })
    } else {
      gameStore.audioRef.current.pause()
    }
  }

  // If turning OFF, stop thunder immediately
  if (!nextIsPlaying) {
    gameStore.stopAllThunder()
  }

  gameStore.setAudioPlaying(nextIsPlaying)
}
