import React from 'react'
import Timer from './timer'
import LevelDisplay from './level-display'
import { PlayerBoardProps } from './types'

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  currentLevel,
  totalLevels,
  setDialogMessage,
  setIsDialogOpen,
  setResetTimer,
  startTimer,
  isPaused,
}) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#333',
          padding: '10px',
          borderRadius: '5px',
          gap: '20px',
        }}
      >
        <Timer
          setDialogMessage={setDialogMessage}
          setIsDialogOpen={setIsDialogOpen}
          setResetTimer={setResetTimer}
          startTimer={startTimer}
          isPaused={isPaused}
        />
        <LevelDisplay currentLevel={currentLevel} totalLevels={totalLevels} />
      </div>
    </>
  )
}

export default PlayerBoard
