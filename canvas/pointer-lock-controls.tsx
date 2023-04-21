import { useCallback, useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { Clock } from 'three';

const moveSpeed = 0.01;

const PointerLockControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef(new PointerLockControlsImpl(camera, gl.domElement));
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const clock = useRef(new Clock());

  const handleFrame = useCallback(() => {
    if (controls.current.isLocked) {
      const delta = clock.current.getDelta();
      controls.current.moveRight(moveSpeed * delta);
      controls.current.moveForward(moveSpeed * delta);
      setAnimationFrameId(requestAnimationFrame(handleFrame));
    }
  }, [controls]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        controls.current.lock();
        if (!animationFrameId) {
          handleFrame();
        }
      } else {
        controls.current.unlock();
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          setAnimationFrameId(null);
        }
      }
    };

    gl.domElement.addEventListener('click', () => {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.focus();
        gl.domElement.requestPointerLock();
      }
    });

    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        setAnimationFrameId(null);
      }
    };
  }, [controls, gl.domElement, animationFrameId, handleFrame]);

  return <primitive ref={controls} dispose={null} object={controls.current} />;
};

export default PointerLockControls;
