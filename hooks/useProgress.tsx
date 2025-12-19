import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-2xl">{progress.toFixed(2)}% loaded</div>
    </Html>
  )
}
