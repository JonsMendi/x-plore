import { useKeyboardControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { wallPositions } from './labyrinth'
import { KeyboardControlHandlerProps } from './types'
import { gameStore } from '@/stores/GameStore'

const moveSpeed = 5 // units per second

// Collision detection helper
const checkCollision = (position: Vector3): boolean => {
  const collisionDistance = 0.6
  return wallPositions.some(
    (wallPos) =>
      Math.abs(position.x - wallPos.x) < collisionDistance &&
      Math.abs(position.z - wallPos.z) < collisionDistance,
  )
}

const KeyboardControlHandler = ({ playerPositionRef }: KeyboardControlHandlerProps) => {
  const { camera } = useThree()

  // ✅ Correctly extract key states using Zustand's selector
  const forward = useKeyboardControls((state) => state.forward)
  const backward = useKeyboardControls((state) => state.backward)
  const left = useKeyboardControls((state) => state.left)
  const right = useKeyboardControls((state) => state.right)

  useFrame((_state, delta) => {
    if (!gameStore.gameStarted) {
      return
    }

    // Clamp delta to avoid huge jumps on tab-switch or lag spikes
    const dt = Math.min(delta, 0.1)

    const direction = new Vector3()
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    const rightVector = new Vector3()
    rightVector.crossVectors(camera.up, direction).normalize()

    const newPosition = camera.position.clone()

    if (forward) newPosition.addScaledVector(direction, moveSpeed * dt)
    if (backward) newPosition.addScaledVector(direction, -moveSpeed * dt)
    if (left) newPosition.addScaledVector(rightVector, moveSpeed * dt)
    if (right) newPosition.addScaledVector(rightVector, -moveSpeed * dt)

    if (!checkCollision(newPosition)) {
      camera.position.copy(newPosition)
      playerPositionRef.current.copy(camera.position)
    }
  })

  return null
}

export default KeyboardControlHandler
