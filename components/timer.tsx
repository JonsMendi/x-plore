import React, { useState, useEffect } from "react";

interface TimerProps {
    setIsDialogOpen: (isOpen: boolean) => void;
    setDialogMessage: (message: string) => void;
    setResetTimer: (resetFn: () => void) => void;
  }
  
  const Timer: React.FC<TimerProps> = ({ setIsDialogOpen, setDialogMessage, setResetTimer }) => {
    const [seconds, setSeconds] = useState(66);
  
    useEffect(() => {
      if (seconds > 0) {
        const interval = setInterval(() => {
          setSeconds((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setDialogMessage("You are not good at this.");
        setIsDialogOpen(true);
      }
    }, [seconds, setIsDialogOpen, setDialogMessage]);
  
    useEffect(() => {
      setResetTimer(() => () => setSeconds(66));
    }, [setResetTimer]);
  
    return <div className="text-white text-lg">hurry-up: {seconds}s</div>;
  };
  
  export default Timer;
  
