import { useGLTF } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { Mesh, Object3D, MeshStandardMaterial } from 'three'
import { TreeProps } from './types'

// Preload so useGLTF never suspends during render
useGLTF.preload('/models/trees.glb')

const Tree: React.FC<TreeProps> = ({ position = [0, 0, 0], scale = 1, color = '#7f7a7a' }) => {
  const { scene } = useGLTF('/models/trees.glb')
  const treeRef = useRef<Mesh>(null)

  const clonedScene = useMemo(() => {
    const clone = scene.clone() as Object3D
    clone.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material = child.material.clone()
        child.material.color.set(color)
      }
    })
    return clone
  }, [scene, color])

  return <primitive ref={treeRef} object={clonedScene} position={position} scale={scale} />
}

export default Tree
