import { useEffect } from "react";
import Image from "next/image";
import flameIcon from "../public/flame-icon.svg";
import { GameDialogProps } from "./types";

const GameDialog: React.FC<GameDialogProps> = ({
  isOpen,
  message,
  buttonText,
  onClose,
  resetTimer,
  resetLevel,
}) => {
  useEffect(() => {
    if (!isOpen) {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm">
        <div className="flex items-center justify-center">
          <Image src={flameIcon} alt="Flame Icon" width={24} height={24} />
          <p className="text-xl font-bold text-black ml-2">{message}</p>
        </div>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          onClick={() => {
            onClose();
            if (resetTimer) resetTimer();
            if (resetLevel) resetLevel();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default GameDialog;
