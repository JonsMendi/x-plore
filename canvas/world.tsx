import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Plane, KeyboardControls } from "@react-three/drei";
import CameraControls from "./use-camera-controls";
import Labyrinth from "./labyrinth";
import { Vector3 } from "three";
import { labyrinthLayouts, LayoutType } from "./labyrinth-layouts";
import LevelDisplay from "./level-display";
import AudioPlayer from "./audio-player";
import KeyboardControlHandler from "./keyboard-controls";
import AudioPlayerButton from "./audio-player-button";

const initialLayout = labyrinthLayouts[0];

const ThreeDWorld = () => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(3, 1, 12)); // Initial position
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [layout, setLayout] = useState<LayoutType>(initialLayout);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect when player reaches the end goal
  useEffect(() => {
    const endGoal = new Vector3(
      layout.endPosition.x,
      layout.endPosition.y,
      layout.endPosition.z
    );
    if (playerPosition.distanceTo(endGoal) < 1) {
      setPlayerPosition(new Vector3(3, 1, 12)); // Reset to the initial position
      setLayoutIndex((prevIndex) => (prevIndex + 1) % labyrinthLayouts.length); // Move to the next layout
    }
  }, [playerPosition]);

  useEffect(() => {
    setLayout(labyrinthLayouts[layoutIndex]);
  }, [layoutIndex]);

  // Toggle Audio Playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch(() =>
            console.log("Autoplay blocked, waiting for user interaction.")
          );
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <div className="w-full h-screen">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w"] },
          { name: "backward", keys: ["ArrowDown", "s"] },
          { name: "left", keys: ["ArrowLeft", "a"] },
          { name: "right", keys: ["ArrowRight", "d"] },
        ]}
      >
        <Canvas className="w-full h-full" style={{ background: "black" }}>
          <PerspectiveCamera makeDefault position={playerPosition.toArray()} />
          <Plane
            args={[100, 100]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
          >
            <meshStandardMaterial attach="material" color="gray" />
          </Plane>
          <Labyrinth layout={layout.layout} endPosition={layout.endPosition} />
          <ambientLight intensity={0.2} />
          <pointLight
            position={playerPosition.toArray()}
            intensity={4}
            distance={5}
          />
          <KeyboardControlHandler setPlayerPosition={setPlayerPosition} />
          <CameraControls />
        </Canvas>
        <LevelDisplay
          currentLevel={layoutIndex + 1}
          totalLevels={labyrinthLayouts.length}
        />
        <AudioPlayerButton
          toggle={toggleAudio}
          isAudioPlaying={isAudioPlaying}
        />
        <AudioPlayer audioRef={audioRef} />
      </KeyboardControls>
    </div>
  );
};

export default ThreeDWorld;
