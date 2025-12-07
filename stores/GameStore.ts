import { makeAutoObservable } from "mobx";

class GameStore {
  sceneLoaded = false;
  startTimer = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSceneLoaded = (loaded: boolean) => {
    this.sceneLoaded = loaded;
  };

  setStartTimer = (start: boolean) => {
    this.startTimer = start;
  };

  handleSceneLoaded = () => {
    this.setSceneLoaded(true);
    this.setStartTimer(true);
  };
}

// Create a singleton instance
export const gameStore = new GameStore();