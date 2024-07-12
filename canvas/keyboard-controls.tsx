import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const moveSpeed = 0.1;

type KeyboardControlsProps = {
  setPlayerPosition: (position: Vector3) => void;
};

const KeyboardControls = ({ setPlayerPosition }: KeyboardControlsProps) => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0; // Lock y-axis movement to keep it parallel to the ground

      const right = new Vector3();
      right.crossVectors(camera.up, direction).normalize();

      const moveVector = new Vector3();

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          moveVector.copy(direction).multiplyScalar(moveSpeed);
          break;
        case 's':
        case 'ArrowDown':
          moveVector.copy(direction).multiplyScalar(-moveSpeed);
          break;
        case 'a':
        case 'ArrowLeft':
          moveVector.copy(right).multiplyScalar(moveSpeed);
          break;
        case 'd':
        case 'ArrowRight':
          moveVector.copy(right).multiplyScalar(-moveSpeed);
          break;
      }

      camera.position.add(moveVector);
      setPlayerPosition(camera.position.clone());
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, setPlayerPosition]);

  return null;
};

export default KeyboardControls;
