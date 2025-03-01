import React from "react";

type LevelDisplayProps = {
  currentLevel: number;
  totalLevels: number;
};

const LevelDisplay: React.FC<LevelDisplayProps> = ({
  currentLevel,
  totalLevels,
}) => {
  return (
    <div
      style={{
        color: "white",
        fontSize: "18px",
      }}
    >
      level: {currentLevel}/{totalLevels}
    </div>
  );
};

export default LevelDisplay;
