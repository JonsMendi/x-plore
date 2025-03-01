import React from "react";

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef }) => {
  return (
    <audio ref={audioRef} loop>
      <source src="/MartianOutback-JohnPatitucci.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
