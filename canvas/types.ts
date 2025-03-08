import { Vector3 } from "three";

export interface ThreeDWorldProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogMessage: (message: string) => void;
  setResetTimer: (resetFn: () => void) => void;
  setResetLevel: (resetFn: () => void) => void;
  onSceneLoaded: () => void;
  startTimer: boolean;
}

export type KeyboardControlHandlerProps = {
  setPlayerPosition: (position: Vector3) => void;
};
