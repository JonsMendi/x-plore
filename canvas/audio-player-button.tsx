import React from "react";

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
        bottom: "20px",
        right: "80px",
        color: "white",
        fontSize: "18px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {isAudioPlaying ? "Pause Music" : "Play Music"}
    </button>
  );
};

export default AudioPlayerButton;
