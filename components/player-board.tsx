import React from "react";
import Timer from "./timer";
import LevelDisplay from "./level-display";

interface PlayerBoardProps {
  currentLevel: number;
  totalLevels: number;
  setDialogMessage: (message: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  setResetTimer: (resetFn: () => void) => void;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({
  currentLevel,
  totalLevels,
  setDialogMessage,
  setIsDialogOpen,
  setResetTimer
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          borderRadius: "5px",
          gap: "20px",
        }}
      >
        <Timer setDialogMessage={setDialogMessage} setIsDialogOpen={setIsDialogOpen} setResetTimer={setResetTimer}  />
        <LevelDisplay currentLevel={currentLevel} totalLevels={totalLevels} />
      </div>
    </>
  );
};

export default PlayerBoard;
