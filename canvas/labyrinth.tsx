import { Box, useTexture } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

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

export const wallPositions: Vector3[] = [];

const Labyrinth = () => {
  const [layout] = useState(initialLayout);
  const texture = useTexture('/lichen_rock_diff_4k.jpg');

  // Clear wall positions before populating
  useEffect(() => {
    wallPositions.length = 0; // Clear existing positions
    layout.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          wallPositions.push(new Vector3(colIndex - 6, 2, rowIndex - 7));
        }
      })
    );
  }, [layout]);

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
                <meshStandardMaterial attach="material" map={texture} />
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
