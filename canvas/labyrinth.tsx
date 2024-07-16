import { Box, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { LayoutType } from './labyrinth-layouts';

export const wallPositions: Vector3[] = [];

type LabyrinthProps = {
  layout: number[][];
  endPosition: { x: number, y: number, z: number };
};

const Labyrinth: React.FC<LabyrinthProps> = ({ layout, endPosition }) => {
  const texture = useTexture('/lichen_rock_diff_4k.jpg');

  useEffect(() => {
    wallPositions.length = 0; // Clear existing positions
    layout.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          wallPositions.push(new Vector3(colIndex - layout[0].length / 2, 2, rowIndex - layout.length / 2));
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
                position={[colIndex - layout[0].length / 2, 2, rowIndex - layout.length / 2]}  // Adjust positions to fit the rotation
              >
                <meshStandardMaterial attach="material" map={texture} />
              </Box>
            );
          }
          return null;
        })
      )}
      <Box args={[1, 1, 1]} position={[endPosition.x, endPosition.y, endPosition.z]}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
    </>
  );
};

export default Labyrinth;
