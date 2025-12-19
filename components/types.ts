export interface TimerProps {
  setIsDialogOpen: (isOpen: boolean) => void
  setDialogMessage: (message: string) => void
  setResetTimer: (resetFn: () => void) => void
  startTimer: boolean
  isPaused: boolean
}

export interface PlayerBoardProps {
  currentLevel: number
  totalLevels: number
  setDialogMessage: (message: string) => void
  setIsDialogOpen: (isOpen: boolean) => void
  setResetTimer: (resetFn: () => void) => void
  startTimer: boolean
  isPaused: boolean
}

export type LevelDisplayProps = {
  currentLevel: number
  totalLevels: number
}

export interface GameDialogProps {
  isOpen: boolean
  message: string
  buttonText: string
  onClose: () => void
  resetTimer: (() => void) | null
  resetLevel: (() => void) | null
}

export interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
}
