import { gameStore } from '@/stores/GameStore'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { AudioPlayerProps } from './types'

const playlist = ['/Shady-Density&Time.mp3', '/MartianOutback-JohnPatitucci.mp3']

const AudioPlayer: React.FC<AudioPlayerProps> = observer(({ audioRef }) => {
  const [trackIndex, setTrackIndex] = useState(0)
  const hasUnlockedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = playlist[trackIndex]
    audio.loop = false
    audio.volume = 0.75

    if (gameStore.isMusicPlaying) {
      audio.play().catch(() => {
        // Autoplay can be blocked until first user interaction.
      })
    }
  }, [audioRef, trackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (gameStore.isMusicPlaying) {
      audio.play().catch(() => {
        // Autoplay can be blocked until first user interaction.
      })
    } else {
      audio.pause()
    }
  }, [audioRef, gameStore.isMusicPlaying])

  useEffect(() => {
    const unlockPlayback = () => {
      if (hasUnlockedRef.current || !gameStore.isMusicPlaying) return
      hasUnlockedRef.current = true
      audioRef.current?.play().catch(() => {
        // Ignore browser policy errors.
      })
    }

    window.addEventListener('pointerdown', unlockPlayback, { once: true })
    return () => window.removeEventListener('pointerdown', unlockPlayback)
  }, [audioRef])

  return (
    <audio
      ref={audioRef}
      muted={!gameStore.isMusicPlaying}
      onEnded={() => {
        setTrackIndex((prev) => (prev + 1) % playlist.length)
      }}
      preload="auto"
    >
      Your browser does not support the audio element.
    </audio>
  )
})

export default AudioPlayer
