import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Matrix4 } from 'three';

const moveSpeed = 0.1;
const leanSpeed = 0.1;
const leanAngle = Math.PI / 6; // 30 degrees

const KeyboardControls = () => {
  const { camera } = useThree();
  const leanStateRef = useRef(0);

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
        case 'q':
          if (leanStateRef.current !== -1) {
            leanStateRef.current = -1;
            const rotationMatrix = new Matrix4().makeRotationFromQuaternion(camera.quaternion);
            const leanMatrix = new Matrix4().makeRotationZ(leanAngle);
            rotationMatrix.multiply(leanMatrix);
            camera.quaternion.setFromRotationMatrix(rotationMatrix);
            camera.position.y -= Math.sin(leanAngle) * leanSpeed;
          }
          break;
        case 'e':
          if (leanStateRef.current !== 1) {
            leanStateRef.current = 1;
            const rotationMatrix = new Matrix4().makeRotationFromQuaternion(camera.quaternion);
            const leanMatrix = new Matrix4().makeRotationZ(-leanAngle);
            rotationMatrix.multiply(leanMatrix);
            camera.quaternion.setFromRotationMatrix(rotationMatrix);
            camera.position.y -= Math.sin(leanAngle) * leanSpeed;
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'q' && leanStateRef.current === -1) {
        leanStateRef.current = 0;
        const rotationMatrix = new Matrix4().makeRotationFromQuaternion(camera.quaternion);
        const leanMatrix = new Matrix4().makeRotationZ(-leanAngle);
        rotationMatrix.multiply(leanMatrix);
        camera.quaternion.setFromRotationMatrix(rotationMatrix);
        camera.position.y += Math.sin(leanAngle) * leanSpeed;
      } else if (event.key === 'e' && leanStateRef.current === 1) {
        leanStateRef.current = 0;
        const rotationMatrix = new Matrix4().makeRotationFromQuaternion(camera.quaternion);
        const leanMatrix = new Matrix4().makeRotationZ(leanAngle);
        rotationMatrix.multiply(leanMatrix);
        camera.quaternion.setFromRotationMatrix(rotationMatrix);
        camera.position.y += Math.sin(leanAngle) * leanSpeed;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  return null;
};

export default KeyboardControls;
