import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import KeyboardControls from './keyboard-controls';
import CameraControls from './use-camera-controls';
import Labyrinth from './labyrinth';
import { Vector3 } from 'three';
import { labyrinthLayouts, LayoutType } from './labyrinth-layouts';
import LevelDisplay from './level-display';

const initialLayout = labyrinthLayouts[0];

const ThreeDWorld = () => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(3, 1, 12)); // Initial position
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [layout, setLayout] = useState<LayoutType>(initialLayout);

  // Detect when player reaches the end goal
  useEffect(() => {
    const endGoal = new Vector3(layout.endPosition.x, layout.endPosition.y, layout.endPosition.z);
    if (playerPosition.distanceTo(endGoal) < 1) {
      setPlayerPosition(new Vector3(3, 1, 12)); // Reset to the initial position
      setLayoutIndex(prevIndex => (prevIndex + 1) % labyrinthLayouts.length); // Move to the next layout
    }
  }, [playerPosition]);

  useEffect(() => {
    setLayout(labyrinthLayouts[layoutIndex]);
  }, [layoutIndex]);

  return (
    <div className="w-full h-screen">
      <Canvas className="w-full h-full" style={{ background: 'black' }}>
        <PerspectiveCamera makeDefault position={playerPosition.toArray()} />
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="gray" />
        </Plane>
        <Labyrinth layout={layout.layout} endPosition={layout.endPosition} />
        <ambientLight intensity={0.2} />
        <pointLight position={playerPosition.toArray()} intensity={4} distance={5} />
        <KeyboardControls setPlayerPosition={setPlayerPosition} />
        <CameraControls />
      </Canvas>
      <LevelDisplay currentLevel={layoutIndex + 1} totalLevels={labyrinthLayouts.length} />
    </div>
  );
};

export default ThreeDWorld;
