import React, { useState, useEffect } from 'react'
import { TimerProps } from './types'
import { gameStore } from '@/stores/GameStore'

const Timer: React.FC<TimerProps> = ({
  setIsDialogOpen,
  setDialogMessage,
  setResetTimer,
  startTimer,
  isPaused,
}) => {
  const [seconds, setSeconds] = useState(66)

  useEffect(() => {
    if (startTimer && !isPaused && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (seconds === 0) {
      setDialogMessage('You are not good at this.')
      setIsDialogOpen(true)
    }
  }, [startTimer, isPaused, seconds, setIsDialogOpen, setDialogMessage])

  useEffect(() => {
    setResetTimer(() => setSeconds(66))
  }, [setResetTimer])

  useEffect(() => {
    gameStore.setRemainingSeconds(seconds)
  }, [seconds])

  return <div className="text-white text-lg">hurry-up: {seconds}s</div>
}

export default Timer
