import { makeAutoObservable } from "mobx";

class GameStore {
  sceneLoaded = false;
  startTimer = false;
  gameStarted = false;
  resetTimer: (() => void) | null = null;
  resetLevel: (() => void) | null = null;
  hover = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSceneLoaded = (loaded: boolean) => {
    this.sceneLoaded = loaded;
  };

  setStartTimer = (start: boolean) => {
    this.startTimer = start;
  };

  setGameStarted = (started: boolean) => {
    this.gameStarted = started;
  };

  setResetTimer = (resetFn?: () => void) => {
    this.resetTimer = resetFn ?? null;
  };

  setResetLevel = (resetFn?: () => void) => {
    this.resetLevel = resetFn ?? null;
  };

  setHover = (isHovering: boolean) => {
    this.hover = isHovering;
  };

  startGame = () => {
    this.setGameStarted(true);
  };

  handleSceneLoaded = () => {
    this.setSceneLoaded(true);
    this.setStartTimer(true);
  };
}

// Create a singleton instance
export const gameStore = new GameStore();