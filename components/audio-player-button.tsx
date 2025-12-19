import { toggleAudio } from '@/helpers/canvas.helpers'
import { gameStore } from '@/stores/GameStore'
import { Volume2, VolumeX } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import React from 'react'

const AudioPlayerButton: React.FC = observer(({}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ color: 'gray', marginRight: '10px', fontSize: '14px' }}>Sound:</span>

      <button
        onClick={toggleAudio}
        style={{
          color: 'white',
          fontSize: '18px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {gameStore.isAudioPlaying ? (
          <Volume2 color="black" size={24} />
        ) : (
          <VolumeX color="black" size={24} />
        )}
      </button>
    </div>
  )
})

export default AudioPlayerButton
