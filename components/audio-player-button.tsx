import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AudioPlayerButtonProps } from "./types";

const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  toggle,
  isAudioPlaying,
}) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (!isAudioPlaying) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [isAudioPlaying]);

  return (
    <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", alignItems: "center" }}>
      {!isAudioPlaying && showMessage && (
        <span style={{ color: "gray", marginRight: "10px", fontSize: "14px" }}>
          Turn on sound for best experience
        </span>
      )}
      <button
        onClick={toggle}
        style={{
          color: "white",
          fontSize: "18px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isAudioPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

export default AudioPlayerButton;