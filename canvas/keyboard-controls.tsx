import { useKeyboardControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { wallPositions } from "./labyrinth";

const moveSpeed = 0.3;
const smoothingFactor = 0.1;

type KeyboardControlHandlerProps = {
  setPlayerPosition: (position: Vector3) => void;
};

// Collision detection helper
const checkCollision = (position: Vector3): boolean => {
  const collisionDistance = 0.6;
  return wallPositions.some(
    (wallPos) =>
      Math.abs(position.x - wallPos.x) < collisionDistance &&
      Math.abs(position.z - wallPos.z) < collisionDistance
  );
};

const KeyboardControlHandler = ({
  setPlayerPosition,
}: KeyboardControlHandlerProps) => {
  const { camera } = useThree();

  // ✅ Correctly extract key states using Zustand's selector
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);

  useFrame(() => {
    const direction = new Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;

    const rightVector = new Vector3();
    rightVector.crossVectors(camera.up, direction).normalize();

    const moveVector = new Vector3();
    const newPosition = camera.position.clone();

    if (forward) newPosition.addScaledVector(direction, moveSpeed);
    if (backward) newPosition.addScaledVector(direction, -moveSpeed);
    if (left) newPosition.addScaledVector(rightVector, moveSpeed);
    if (right) newPosition.addScaledVector(rightVector, -moveSpeed);

    if (!checkCollision(newPosition)) {
      camera.position.lerp(newPosition, smoothingFactor);
      setPlayerPosition(camera.position.clone());
    }
  });

  return null;
};

export default KeyboardControlHandler;
