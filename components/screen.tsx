'use client'

import StartCube from '@/canvas/start-cube'
import ThreeDWorld from '@/canvas/world'
import GameDialog from '@/components/game-dialog'
import LeaderboardModal from '@/components/leaderboard-modal'
import PauseDialog from '@/components/pause-dialog'
import { observer } from 'mobx-react-lite'
import { dialogStore } from '@/stores/DialogStore'
import { gameStore } from '@/stores/GameStore'
import { useState } from 'react'
import { labyrinthLayouts } from '@/canvas/labyrinth-layouts'

const Screen = observer(() => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const requestPointerLock = () => {
    if (typeof document === 'undefined') return
    const lockTarget = document.body ?? document.documentElement
    const request = lockTarget?.requestPointerLock as (() => Promise<void> | void) | undefined
    if (!request) return
    const result = request.call(lockTarget)
    if (result && typeof (result as Promise<void>).catch === 'function') {
      ;(result as Promise<void>).catch((err) => {
        console.warn('Pointer lock request failed', err)
      })
    }
  }

  const handleStartGame = () => {
    gameStore.startGame()
    requestPointerLock()
  }

  const handleResume = () => {
    gameStore.setPaused(false)
    requestPointerLock()
  }

  const leaderboardDialogMessages = new Set(['You are not good at this.', 'You are still not good enough.'])
  const leaderboardFromDialog =
    dialogStore.isDialogOpen && leaderboardDialogMessages.has(dialogStore.dialogMessage)
  const elapsedSeconds = Math.max(0, 66 - gameStore.remainingSeconds)

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black relative">
      {gameStore.gameStarted ? (
        <ThreeDWorld
          isDialogOpen={dialogStore.isDialogOpen}
          setIsDialogOpen={dialogStore.setIsDialogOpen}
          setDialogMessage={dialogStore.setDialogMessage}
          setResetTimer={gameStore.setResetTimer}
          setResetLevel={gameStore.setResetLevel}
          onSceneLoaded={gameStore.handleSceneLoaded}
          startTimer={gameStore.startTimer}
          isPaused={gameStore.isPaused}
        />
      ) : (
        <div className="text-center">
          <div className="text-gray-700 text-6xl font-bold px-10 py-5 rounded-md">
            <span className="text-red-500">X</span>-Plore
          </div>

          <StartCube
            onClick={handleStartGame}
            onPointerOver={() => gameStore.setHover(true)}
            onPointerOut={() => gameStore.setHover(false)}
          />
          <p
            className={`mt-2 absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${
              gameStore.hover ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            let me tell you how bad you are at this.
          </p>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="mt-5 rounded bg-gray-800 px-5 py-2 text-sm text-white hover:bg-gray-700"
          >
            View Leaderboard
          </button>
        </div>
      )}

      {gameStore.sceneLoaded && !leaderboardFromDialog && (
        <GameDialog
          isOpen={dialogStore.isDialogOpen}
          message={dialogStore.dialogMessage}
          buttonText={
            dialogStore.dialogMessage === 'You are not good at this.' ? 'Yes, I am not.' : 'I know.'
          }
          onClose={dialogStore.closeDialog}
          resetTimer={gameStore.resetTimer}
          resetLevel={gameStore.resetLevel}
        />
      )}
      <LeaderboardModal
        isOpen={showLeaderboard || (gameStore.sceneLoaded && leaderboardFromDialog)}
        onClose={() => {
          if (leaderboardFromDialog) {
            dialogStore.closeDialog()
            if (gameStore.resetTimer) gameStore.resetTimer()
            if (gameStore.resetLevel) gameStore.resetLevel()
          }
          setShowLeaderboard(false)
        }}
        pendingScore={
          leaderboardFromDialog
            ? { level: gameStore.currentLevel || labyrinthLayouts.length, elapsedSeconds }
            : null
        }
      />
      {!dialogStore.isDialogOpen && <PauseDialog isOpen={gameStore.isPaused} onResume={handleResume} />}
    </div>
  )
})

export default Screen
