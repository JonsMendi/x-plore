import React from 'react'
import AudioPlayerButton from './audio-player-button'

interface PauseDialogProps {
  isOpen: boolean
  onResume: () => void
  onMainMenu: () => void
}

const PauseDialog: React.FC<PauseDialogProps> = ({ isOpen, onResume, onMainMenu }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm">
        <h2 className="text-2xl font-bold text-black mb-4">Game Paused</h2>
        <AudioPlayerButton />
        <div className="mt-4 flex justify-center gap-3">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
            onClick={onResume}
          >
            Resume
          </button>
          <button
            className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            onClick={onMainMenu}
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default PauseDialog
