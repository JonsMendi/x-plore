import React from "react";

interface PauseDialogProps {
  isOpen: boolean;
  onResume: () => void;
}

const PauseDialog: React.FC<PauseDialogProps> = ({ isOpen, onResume }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
        <h2 className="text-2xl font-bold text-black mb-4">Game Paused</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          onClick={onResume}
        >
          Resume
        </button>
      </div>
    </div>
  );
};

export default PauseDialog;
