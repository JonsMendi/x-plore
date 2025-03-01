import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerButtonProps {
  toggle: any;
  isAudioPlaying: any;
}

const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  toggle,
  isAudioPlaying,
}) => {
  return (
    <button
      onClick={toggle}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "white",
        fontSize: "18px",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {isAudioPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
};

export default AudioPlayerButton;
