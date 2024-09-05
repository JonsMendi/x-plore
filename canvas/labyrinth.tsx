import { Box, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { LayoutType } from './labyrinth-layouts';

export const wallPositions: Vector3[] = [];

const Labyrinth: React.FC<LayoutType> = ({ layout, endPosition }) => {
  const texture = useTexture('/lichen_rock_diff_4k.jpg');

  useEffect(() => {
    wallPositions.length = 0;
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
                position={[colIndex - layout[0].length / 2, 2, rowIndex - layout.length / 2]}
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
