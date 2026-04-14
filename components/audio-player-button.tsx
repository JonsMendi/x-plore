import { toggleLightning, toggleMusic } from '@/helpers/canvas.helpers'
import { gameStore } from '@/stores/GameStore'
import { Volume2, VolumeX } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import React from 'react'

const AudioPlayerButton: React.FC = observer(({}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
      <span style={{ color: 'gray', fontSize: '14px' }}>Sound controls:</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'gray', marginRight: '10px', fontSize: '14px', width: '72px' }}>Music:</span>
        <button
          onClick={toggleMusic}
          style={{
            color: 'white',
            fontSize: '18px',
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {gameStore.isMusicPlaying ? <Volume2 color="black" size={22} /> : <VolumeX color="black" size={22} />}
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'gray', marginRight: '10px', fontSize: '14px', width: '72px' }}>Lightning:</span>
        <button
          onClick={toggleLightning}
          style={{
            color: 'white',
            fontSize: '18px',
            padding: '8px',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {gameStore.isLightningPlaying ? (
            <Volume2 color="black" size={22} />
          ) : (
            <VolumeX color="black" size={22} />
          )}
        </button>
      </div>
      {/*
        Music controls the background playlist.
        Lightning controls thunder/light flash effects during gameplay.
      */}
    </div>
  )
})

export default AudioPlayerButton
