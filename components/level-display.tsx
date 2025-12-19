import React from 'react'
import { LevelDisplayProps } from './types'

const LevelDisplay: React.FC<LevelDisplayProps> = ({ currentLevel, totalLevels }) => {
  return (
    <div
      style={{
        color: 'white',
        fontSize: '18px',
      }}
    >
      level: {currentLevel}/{totalLevels}
    </div>
  )
}

export default LevelDisplay
