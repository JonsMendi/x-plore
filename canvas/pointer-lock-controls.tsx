import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';

const moveSpeed = 0.1;

const PointerLockControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef(new PointerLockControlsImpl(camera, gl.domElement));
  const moveState = useRef({ forward: 0, right: 0 });
  const animationFrameId = useRef<number | null>(null);

  const handleFrame = () => {
    const deltaForward = moveState.current.forward * moveSpeed;
    const deltaRight = moveState.current.right * moveSpeed;
    controls.current.moveForward(deltaForward);
    controls.current.moveRight(deltaRight);
    animationFrameId.current = requestAnimationFrame(handleFrame);
  };

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        controls.current.lock();
        if (!animationFrameId.current) {
          handleFrame(); // Call handleFrame here
        }
      } else {
        controls.current.unlock();
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
    };

    const handleClick = () => {
      gl.domElement.focus();
      gl.domElement.requestPointerLock();
    };

    gl.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      gl.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [controls, gl.domElement]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveState.current.forward = 1;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveState.current.forward = -1;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveState.current.right = -1;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveState.current.right = 1;
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
        case 'ArrowDown':
        case 'KeyS':
          moveState.current.forward = 0;
          break;
        case 'ArrowLeft':
        case 'KeyA':
        case 'ArrowRight':
        case 'KeyD':
          moveState.current.right = 0;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return <primitive ref={controls} dispose={null} object={controls.current} />;
};

export default PointerLockControls;
