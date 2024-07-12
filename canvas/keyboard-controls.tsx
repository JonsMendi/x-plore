import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { wallPositions } from './labyrinth';

const moveSpeed = 0.1;

// Define the type for the setPlayerPosition prop
type KeyboardControlsProps = {
  setPlayerPosition: (position: Vector3) => void;
};

// Helper function to check collision
const checkCollision = (position: Vector3): boolean => {
  const collisionDistance = 0.6; // Adjust the collision distance if necessary
  return wallPositions.some((wallPos) => {
    return (
      Math.abs(position.x - wallPos.x) < collisionDistance &&
      Math.abs(position.z - wallPos.z) < collisionDistance
    );
  });
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
      const newPosition = camera.position.clone();

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          moveVector.copy(direction).multiplyScalar(moveSpeed);
          newPosition.add(moveVector);
          break;
        case 's':
        case 'ArrowDown':
          moveVector.copy(direction).multiplyScalar(-moveSpeed);
          newPosition.add(moveVector);
          break;
        case 'a':
        case 'ArrowLeft':
          moveVector.copy(right).multiplyScalar(moveSpeed);
          newPosition.add(moveVector);
          break;
        case 'd':
        case 'ArrowRight':
          moveVector.copy(right).multiplyScalar(-moveSpeed);
          newPosition.add(moveVector);
          break;
      }

      // Check for collision before updating the position
      if (!checkCollision(newPosition)) {
        camera.position.copy(newPosition);
        setPlayerPosition(newPosition.clone());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, setPlayerPosition]);

  return null;
};

export default KeyboardControls;
