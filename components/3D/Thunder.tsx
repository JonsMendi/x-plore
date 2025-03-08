import { useEffect, useState, useRef } from "react";
import { DirectionalLight } from "three";
import { ThunderProps } from "./types";

export const thunderSounds = [
    "/audio/thunders/thunder1.mp3",
    "/audio/thunders/thunder2.mp3",
  ];

const Thunder: React.FC<ThunderProps> = ({ thunderAudioRefs, isAudioPlaying }) => {
 
  const [lightIntensity, setLightIntensity] = useState(0);
  const [lastPlayedIndex, setLastPlayedIndex] = useState<number | null>(null);
  const lightRef = useRef<DirectionalLight>(null);

  useEffect(() => {
    const playRandomThunder = () => {
      if (!isAudioPlaying) return;

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * thunderSounds.length);
      } while (randomIndex === lastPlayedIndex);

      setLastPlayedIndex(randomIndex);

      // Play thunder sound
      const audio = thunderAudioRefs.current[randomIndex];
      audio.src = thunderSounds[randomIndex];
      audio.currentTime = 0;
      audio.play().catch(() => console.log("Thunder sound blocked."));
    };

    const flashThunder = () => {
      setLightIntensity(3 + Math.random() * 2);
      playRandomThunder();
      setTimeout(() => setLightIntensity(0), 100 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        flashThunder();
      }
    }, Math.random() * 2000 + 1000);

    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  return <directionalLight ref={lightRef} position={[0, 10, 0]} intensity={lightIntensity} color="white" />;
};

export default Thunder;
