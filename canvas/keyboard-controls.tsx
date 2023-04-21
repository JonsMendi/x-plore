import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const moveSpeed = 0.1;

const KeyboardControls = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          camera.position.z -= moveSpeed;
          break;
        case 's':
        case 'ArrowDown':
          camera.position.z += moveSpeed;
          break;
        case 'a':
        case 'ArrowLeft':
          camera.position.x -= moveSpeed;
          break;
        case 'd':
        case 'ArrowRight':
          camera.position.x += moveSpeed;
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
