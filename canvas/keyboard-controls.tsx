import { useKeyboardControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { wallPositions } from './labyrinth'
import { KeyboardControlHandlerProps } from './types'
import { gameStore } from '@/stores/GameStore'
import { useRef } from 'react'

const moveSpeed = 5 // units per second
const jumpVelocity = 6
const gravity = 18
const groundY = 1

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
  const verticalVelocityRef = useRef(0)
  const jumpHeldRef = useRef(false)

  // ✅ Correctly extract key states using Zustand's selector
  const forward = useKeyboardControls((state) => state.forward)
  const backward = useKeyboardControls((state) => state.backward)
  const left = useKeyboardControls((state) => state.left)
  const right = useKeyboardControls((state) => state.right)
  const jump = useKeyboardControls((state) => state.jump)

  useFrame((_state, delta) => {
    if (!gameStore.gameStarted) {
      return
    }

    // Support external reposition requests (level advance/reset).
    if (camera.position.distanceToSquared(playerPositionRef.current) > 0.0001) {
      camera.position.copy(playerPositionRef.current)
      verticalVelocityRef.current = 0
    }

    // Clamp delta to avoid huge jumps on tab-switch or lag spikes
    const dt = Math.min(delta, 0.1)

    const direction = new Vector3()
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    const rightVector = new Vector3()
    rightVector.crossVectors(camera.up, direction).normalize()

    const horizontalDelta = new Vector3()
    const grounded = camera.position.y <= groundY + 0.001

    // Trigger jump only on initial key press when grounded.
    if (jump && grounded && !jumpHeldRef.current) {
      verticalVelocityRef.current = jumpVelocity
    }
    jumpHeldRef.current = jump

    if (forward) horizontalDelta.addScaledVector(direction, moveSpeed * dt)
    if (backward) horizontalDelta.addScaledVector(direction, -moveSpeed * dt)
    if (left) horizontalDelta.addScaledVector(rightVector, moveSpeed * dt)
    if (right) horizontalDelta.addScaledVector(rightVector, -moveSpeed * dt)

    // Resolve horizontal movement per-axis so player slides along walls.
    const newPosition = camera.position.clone()
    if (horizontalDelta.x !== 0) {
      const tryX = newPosition.clone()
      tryX.x += horizontalDelta.x
      if (!checkCollision(tryX)) newPosition.x = tryX.x
    }
    if (horizontalDelta.z !== 0) {
      const tryZ = newPosition.clone()
      tryZ.z += horizontalDelta.z
      if (!checkCollision(tryZ)) newPosition.z = tryZ.z
    }

    verticalVelocityRef.current -= gravity * dt
    newPosition.y += verticalVelocityRef.current * dt

    if (newPosition.y <= groundY) {
      newPosition.y = groundY
      verticalVelocityRef.current = 0
    }

    camera.position.copy(newPosition)
    playerPositionRef.current.copy(camera.position)
  })

  return null
}

export default KeyboardControlHandler
