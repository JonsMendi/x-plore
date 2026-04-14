import { Box, MeshDistortMaterial } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { Vector3 } from 'three'
import { LayoutType } from './labyrinth-layouts'
import { createLevelTexture } from './level-textures'

export const wallPositions: Vector3[] = []

const Labyrinth: React.FC<LayoutType> = ({ layout, endPosition, textureTheme }) => {
  const wallTexture = useMemo(() => createLevelTexture(textureTheme, 'wall'), [textureTheme])

  useEffect(() => {
    wallPositions.length = 0
    layout.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          wallPositions.push(
            new Vector3(colIndex - layout[0].length / 2, 2, rowIndex - layout.length / 2),
          )
        }
      }),
    )
    return () => {
      wallTexture.dispose()
    }
  }, [layout, wallTexture])

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
                <meshStandardMaterial attach="material" map={wallTexture} />
              </Box>
            )
          }
          return null
        }),
      )}
      <Box args={[1, 1, 1]} position={[endPosition.x, endPosition.y, endPosition.z]}>
        <MeshDistortMaterial
          attach="material"
          color="white"
          metalness={0.7}
          roughness={1}
          distort={0.6}
          speed={0.6}
        />
      </Box>
    </>
  )
}

export default Labyrinth
