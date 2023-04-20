import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Plane, Box } from '@react-three/drei';
import PointerLockControls from './pointer-lock-controls';

const ThreeDWorld = () => {
  return (
    <div className="w-full h-screen">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />

        {/* Add a simple ground plane */}
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="gray" />
        </Plane>

        {/* Add some objects */}
        <Box args={[1, 1, 1]} position={[0, 0.5, -3]}>
          <meshStandardMaterial attach="material" color="blue" />
        </Box>

        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <OrbitControls />
        <PointerLockControls />
      </Canvas>
    </div>
  );
};

export default ThreeDWorld;
