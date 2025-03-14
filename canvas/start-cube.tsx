import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const RotatingCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={0.9}
        roughness={0}
      />
    </mesh>
  );
};

const StartCube: React.FC<{ onClick?: () => void; onPointerOver?: () => void; onPointerOut?: () => void }> = ({ onClick, onPointerOver, onPointerOut }) => {
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const animateLight = () => {
      setLightIntensity((prev) => {
        if (hover && prev < 1.3) {
          return prev + 0.03;
        } else if (!hover && prev > 0.5) {
          return prev - 0.03;
        }
        return prev;
      });
      animationFrameId = requestAnimationFrame(animateLight);
    };

    animateLight();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hover]);

  return (
    <Canvas
      style={{ width: "400px", height: "400px", cursor: "pointer" }}
      onClick={onClick}
      onPointerOver={() => {
        setHover(true);
        if (onPointerOver) onPointerOver();
      }}
      onPointerOut={() => {
        setHover(false);
        if (onPointerOut) onPointerOut();
      }}
      camera={{ position: [5, 3, 5], fov: 40 }}
    >
      <ambientLight intensity={lightIntensity} />
      <pointLight position={[2, 2, 2]} intensity={7} distance={3.5} />
      <RotatingCube />
    </Canvas>
  );
};

export default StartCube;