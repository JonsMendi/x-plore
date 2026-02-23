'use client'

import StartCube from '@/canvas/start-cube'
import ThreeDWorld from '@/canvas/world'
import GameDialog from '@/components/game-dialog'
import PauseDialog from '@/components/pause-dialog'
import { observer } from 'mobx-react-lite'
import { dialogStore } from '@/stores/DialogStore'
import { gameStore } from '@/stores/GameStore'

const Screen = observer(() => {
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
        </div>
      )}

      {gameStore.sceneLoaded && (
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
      {!dialogStore.isDialogOpen && <PauseDialog isOpen={gameStore.isPaused} onResume={handleResume} />}
    </div>
  )
})

export default Screen
