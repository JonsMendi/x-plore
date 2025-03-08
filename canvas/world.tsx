import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Plane,
  KeyboardControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { Vector3 } from "three";
import CameraControls from "./use-camera-controls";
import Labyrinth from "./labyrinth";
import { labyrinthLayouts, LayoutType } from "./labyrinth-layouts";
import AudioPlayer from "../components/audio-player";
import KeyboardControlHandler from "./keyboard-controls";
import AudioPlayerButton from "../components/audio-player-button";
import PlayerBoard from "../components/player-board";
import { ThreeDWorldProps } from "./types";
import Tree from "@/components/3D/Trees";
import Thunder, { thunderSounds } from "@/components/3D/Thunder";

const initialLayout = labyrinthLayouts[0];

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const { progress } = useProgress();
  useEffect(() => {
    if (progress >= 100) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <Html center>
      <div className="text-white text-2xl">{progress.toFixed(2)}% loaded</div>
    </Html>
  );
};

const ThreeDWorld: React.FC<ThreeDWorldProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  setResetTimer,
  setResetLevel,
  setDialogMessage,
  onSceneLoaded,
  startTimer,
}) => {
  const [playerPosition, setPlayerPosition] = useState(new Vector3(3, 1, 12));
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [layout, setLayout] = useState<LayoutType>(initialLayout);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const thunderAudioRefs = useRef(thunderSounds.map(() => new Audio()));

  useEffect(() => {
    if (isDialogOpen) {
      document.exitPointerLock();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    const endGoal = new Vector3(
      layout.endPosition.x,
      layout.endPosition.y,
      layout.endPosition.z
    );
    if (playerPosition.distanceTo(endGoal) < 1) {
      if (layoutIndex === labyrinthLayouts.length - 1) {
        // Last level completed -> Trigger different dialog
        setIsDialogOpen(true);
        setDialogMessage("You are still not good enough.");
      } else {
        setPlayerPosition(new Vector3(3, 1, 12));
        setLayoutIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, [playerPosition]);

  useEffect(() => {
    setLayout(labyrinthLayouts[layoutIndex]);
  }, [layoutIndex]);

  useEffect(() => {
    setResetLevel(() => () => {
      setLayoutIndex(0);
      setPlayerPosition(new Vector3(3, 1, 12));
    });
  }, [setResetLevel]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => console.log("Autoplay blocked."));
      }
    }

    thunderAudioRefs.current.forEach((audio) => {
      if (isAudioPlaying) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="w-full h-screen relative">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w"] },
          { name: "backward", keys: ["ArrowDown", "s"] },
          { name: "left", keys: ["ArrowLeft", "a"] },
          { name: "right", keys: ["ArrowRight", "d"] },
        ]}
      >
        <Canvas className="w-full h-full" style={{ background: "black" }}>
          <Suspense fallback={<Loader onComplete={onSceneLoaded} />}>
            <PerspectiveCamera
              makeDefault
              position={playerPosition.toArray()}
            />
            <Plane
              args={[100, 100]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial attach="material" color="gray" />
            </Plane>
            <Labyrinth
              layout={layout.layout}
              endPosition={layout.endPosition}
            />
            <Tree position={[-20, 0, -35]} scale={13} />
            <Tree position={[0, 0, -35]} scale={25} />
            <Tree position={[20, 0, -15]} scale={15} />
            <Tree position={[20, 0, 10]} scale={12} />
            <Tree position={[20, 0, 25]} scale={15} />
            <Tree position={[5, 0, 25]} scale={10} />
            <Tree position={[-10, 0, 25]} scale={11} />
            <Tree position={[-20, 0, 10]} scale={10} />
            <Tree position={[-20, 0, -10]} scale={13} />

            <ambientLight intensity={0.1} />
            <pointLight
              position={playerPosition.toArray()}
              intensity={7}
              distance={3}
            />
            <Thunder thunderAudioRefs={thunderAudioRefs} isAudioPlaying={isAudioPlaying} />
            <KeyboardControlHandler setPlayerPosition={setPlayerPosition} />
            <CameraControls />
          </Suspense>
        </Canvas>

        {/* UI Components */}
        <div>
          <PlayerBoard
            currentLevel={layoutIndex + 1}
            totalLevels={labyrinthLayouts.length}
            setDialogMessage={setDialogMessage}
            setIsDialogOpen={setIsDialogOpen}
            setResetTimer={setResetTimer}
            startTimer={startTimer}
          />
          <AudioPlayerButton
            toggle={toggleAudio}
            isAudioPlaying={isAudioPlaying}
          />
          <AudioPlayer audioRef={audioRef} />
        </div>
      </KeyboardControls>
    </div>
  );
};

export default ThreeDWorld;
