import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Euler } from 'three';

const CameraControls = () => {
  const { camera, gl } = useThree();
  const isLocked = useRef(false);
  const movement = useRef(new Vector2());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isLocked.current) {
        movement.current.x -= event.movementX * 0.002;
        movement.current.y -= event.movementY * 0.002;
        movement.current.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, movement.current.y));

        // Update camera rotation without affecting the roll
        camera.rotation.set(movement.current.y, movement.current.x, 0, 'YXZ');
      }
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        isLocked.current = true;
      } else {
        isLocked.current = false;
      }
    };

    gl.domElement.addEventListener('click', () => {
      gl.domElement.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, gl.domElement]);

  return null;
};

export default CameraControls;
