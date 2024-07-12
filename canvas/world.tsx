import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import KeyboardControls from './keyboard-controls';
import CameraControls from './use-camera-controls';
import Labyrinth from './labyrinth';
import { Vector3 } from 'three';

const initialLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
];

const endPosition = { x: -2, y: 0.5, z: 0 };

const ThreeDWorld = () => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(3, 1, 12)); // Initial position
  const [layout, setLayout] = useState(initialLayout);

  // Detect when player reaches the end goal
  useEffect(() => {
    const endGoal = new Vector3(endPosition.x, endPosition.y, endPosition.z);
    if (playerPosition.distanceTo(endGoal) < 1) {
      setPlayerPosition(new Vector3(3, 1, 12)); // Reset to the initial position
      setLayout(initialLayout); // in future replace this with a function to generate a more complex layout
    }
  }, [playerPosition]);

  return (
    <div className="w-full h-screen">
      <Canvas className="w-full h-full" style={{ background: 'black' }}>
        <PerspectiveCamera makeDefault position={playerPosition.toArray()} />
        {/* Add a simple ground plane */}
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="gray" />
        </Plane>
        {/* Add the labyrinth */}
        <Labyrinth />
        <ambientLight intensity={0.1} />
        <pointLight position={playerPosition.toArray()} intensity={3} distance={5} />
        <KeyboardControls setPlayerPosition={setPlayerPosition} />
        <CameraControls />
      </Canvas>
    </div>
  );
};

export default ThreeDWorld;
