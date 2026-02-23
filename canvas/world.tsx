import Thunder from '@/components/3D/Thunder'
import Tree from '@/components/3D/Trees'
import KeyboardLegend from '@/components/keyboard-legend'
import { gameStore } from '@/stores/GameStore'
import { Html, KeyboardControls, PerspectiveCamera, Plane, useProgress } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { observer } from 'mobx-react-lite'
import { Suspense, useEffect, useRef, useState } from 'react'
import { PointLight, Vector3 } from 'three'
import AudioPlayer from '../components/audio-player'
import PlayerBoard from '../components/player-board'
import KeyboardControlHandler from './keyboard-controls'
import Labyrinth from './labyrinth'
import { labyrinthLayouts, LayoutType } from './labyrinth-layouts'
import { ThreeDWorldProps } from './types'
import CameraControls from './use-camera-controls'

const initialLayout = labyrinthLayouts[0]

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const { progress } = useProgress()
  useEffect(() => {
    if (progress >= 100) {
      onComplete()
    }
  }, [progress, onComplete])

  return (
    <Html center>
      <div className="text-white text-2xl">{progress.toFixed(2)}% loaded</div>
    </Html>
  )
}
// Component that makes a point light follow the camera each frame (no React state)
const PlayerLight = () => {
  const { camera } = useThree()
  const lightRef = useRef<PointLight>(null)

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position)
    }
  })

  return <pointLight ref={lightRef} intensity={7} distance={7} />
}

// Component that checks if the player reached the goal each frame (no React state)
const GoalDetector = ({
  endPosition,
  onReachGoal,
}: {
  endPosition: { x: number; y: number; z: number }
  onReachGoal: () => void
}) => {
  const { camera } = useThree()
  const firedRef = useRef(false)

  // Reset when the target changes
  useEffect(() => {
    firedRef.current = false
  }, [endPosition.x, endPosition.y, endPosition.z])

  useFrame(() => {
    if (firedRef.current) return
    const endGoal = new Vector3(endPosition.x, endPosition.y, endPosition.z)
    if (camera.position.distanceTo(endGoal) < 1) {
      firedRef.current = true
      onReachGoal()
    }
  })

  return null
}

const ThreeDWorld: React.FC<ThreeDWorldProps> = observer(
  ({
    isDialogOpen,
    setIsDialogOpen,
    setResetTimer,
    setResetLevel,
    setDialogMessage,
    onSceneLoaded,
    startTimer,
    isPaused,
  }) => {
    const playerPositionRef = useRef(new Vector3(3, 1, 12))
    const [layoutIndex, setLayoutIndex] = useState(0)
    const [layout, setLayout] = useState<LayoutType>(initialLayout)
    const audioRef = gameStore.audioRef

    useEffect(() => {
      if (isDialogOpen) {
        document.exitPointerLock()
      }
    }, [isDialogOpen])

    const handleReachGoal = () => {
      if (layoutIndex === labyrinthLayouts.length - 1) {
        setIsDialogOpen(true)
        setDialogMessage('You are still not good enough.')
      } else {
        playerPositionRef.current.set(3, 1, 12)
        setLayoutIndex((prevIndex) => prevIndex + 1)
      }
    }

    useEffect(() => {
      setLayout(labyrinthLayouts[layoutIndex])
    }, [layoutIndex])

    useEffect(() => {
      setResetLevel(() => {
        setLayoutIndex(0)
        playerPositionRef.current.set(3, 1, 12)
      })
    }, [setResetLevel])

    return (
      <div className="w-full h-screen relative">
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['ArrowUp', 'w'] },
            { name: 'backward', keys: ['ArrowDown', 's'] },
            { name: 'left', keys: ['ArrowLeft', 'a'] },
            { name: 'right', keys: ['ArrowRight', 'd'] },
          ]}
        >
          <Canvas className="w-full h-full" style={{ background: 'black' }}>
            <Suspense fallback={<Loader onComplete={onSceneLoaded} />}>
              <PerspectiveCamera makeDefault position={playerPositionRef.current.toArray()} />
              <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <meshStandardMaterial attach="material" color="gray" />
              </Plane>
              <Labyrinth
                layout={layout.layout}
                endPosition={layout.endPosition}
                entrancePosition={layout.entrancePosition}
              />
              <Tree position={[-20, 0, -35]} scale={13} />
              <Tree position={[0, 0, -35]} scale={25} />
              <Tree position={[20, 0, -15]} scale={15} />
              <Tree position={[20, 0, 10]} scale={12} />
              <Tree position={[20, 0, 25]} scale={15} />
              <Tree position={[5, 0, 25]} scale={10} />
              <Tree position={[-10, 0, 25]} scale={11} />
              <Tree position={[-20, 0, 10]} scale={10} />
              <Tree position={[-20, 0, -10]} scale={13} />

              <ambientLight intensity={0.2} />
              <PlayerLight />
              {layout.entrancePosition && (
                <pointLight
                  position={[
                    layout.entrancePosition.x,
                    layout.entrancePosition.y + 2,
                    layout.entrancePosition.z,
                  ]}
                  intensity={10}
                  distance={3}
                />
              )}
              <Thunder isAudioPlaying={gameStore.isAudioPlaying} />
              <KeyboardControlHandler playerPositionRef={playerPositionRef} />
              <GoalDetector endPosition={layout.endPosition} onReachGoal={handleReachGoal} />
              <CameraControls />
            </Suspense>
          </Canvas>

          {/* UI Components */}
          <div>
            <PlayerBoard
              currentLevel={layoutIndex + 1}
              totalLevels={labyrinthLayouts.length}
              setDialogMessage={setDialogMessage}
              setIsDialogOpen={setIsDialogOpen}
              setResetTimer={setResetTimer}
              startTimer={startTimer}
              isPaused={isPaused}
            />
            {audioRef && <AudioPlayer audioRef={audioRef} />}
            <KeyboardLegend />
          </div>
        </KeyboardControls>
      </div>
    )
  },
)

export default ThreeDWorld
