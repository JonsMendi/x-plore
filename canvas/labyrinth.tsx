import { Box } from '@react-three/drei';
import { useState } from 'react';

const initialLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
];

const endPosition = { x: -2, y: 0.5, z: 0 };

const Labyrinth = () => {
  const [layout] = useState(initialLayout);

  return (
    <>
      {layout.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === 1) {
            return (
              <Box
                key={`${rowIndex}-${colIndex}`}
                args={[1, 4, 1]}
                position={[colIndex - 6, 2, rowIndex - 7]}  // Adjust positions to fit the rotation
              >
                <meshStandardMaterial attach="material" color="blue" />
              </Box>
            );
          }
          return null;
        })
      )}
      {/* End goal object */}
      <Box args={[1, 1, 1]} position={[endPosition.x, endPosition.y, endPosition.z]}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
    </>
  );
};

export default Labyrinth;
