import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Mesh, Object3D, MeshStandardMaterial } from 'three'
import { TreeProps } from './types'

const Tree: React.FC<TreeProps> = ({ position = [0, 0, 0], scale = 1, color = '#7f7a7a' }) => {
  const { scene } = useGLTF('/models/trees.glb')
  const treeRef = useRef<Mesh>(null)
  const clonedScene = scene.clone() as Object3D

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof Mesh) {
        if (child.material instanceof MeshStandardMaterial) {
          child.material = child.material.clone()
          child.material.color.set(color)
        }
      }
    })
  }, [clonedScene, color])

  return <primitive ref={treeRef} object={clonedScene} position={position} scale={scale} />
}

export default Tree
