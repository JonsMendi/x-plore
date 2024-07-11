import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';

const moveSpeed = 0.1;

const KeyboardControls = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0; // Lock y-axis movement to keep it parallel to the ground

      const right = new Vector3();
      right.crossVectors(camera.up, direction).normalize();

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          camera.position.add(direction.multiplyScalar(moveSpeed));
          break;
        case 's':
        case 'ArrowDown':
          camera.position.add(direction.multiplyScalar(-moveSpeed));
          break;
        case 'a':
        case 'ArrowLeft':
          camera.position.add(right.multiplyScalar(moveSpeed));
          break;
        case 'd':
        case 'ArrowRight':
          camera.position.add(right.multiplyScalar(-moveSpeed));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera]);

  return null;
};

export default KeyboardControls;
