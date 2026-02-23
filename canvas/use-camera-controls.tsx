import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector2, Euler } from 'three'
import { gameStore } from '@/stores/GameStore'
import { dialogStore } from '@/stores/DialogStore'

const CameraControls = () => {
  const { camera, gl } = useThree()
  const isLocked = useRef(false)
  const movement = useRef(new Vector2())

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isLocked.current) {
        movement.current.x -= event.movementX * 0.002
        movement.current.y -= event.movementY * 0.002
        movement.current.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, movement.current.y))

        // Update camera rotation without affecting the roll
        camera.rotation.set(movement.current.y, movement.current.x, 0, 'YXZ')
      }
    }

    const handlePointerLockChange = () => {
      const wasLocked = isLocked.current
      isLocked.current = document.pointerLockElement !== null

      if (wasLocked && !isLocked.current && gameStore.gameStarted && !dialogStore.isDialogOpen) {
        gameStore.setPaused(true)
      }
    }

    const handleCanvasClick = () => {
      gl.domElement.requestPointerLock()
    }

    handlePointerLockChange()

    gl.domElement.addEventListener('click', handleCanvasClick)

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      gl.domElement.removeEventListener('click', handleCanvasClick)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [camera, gl.domElement])

  return null
}

export default CameraControls
