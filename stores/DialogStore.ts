import { makeAutoObservable } from "mobx";

class DialogStore {
  isDialogOpen = false;
  dialogMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setIsDialogOpen = (isOpen: boolean) => {
    this.isDialogOpen = isOpen;
  };

  setDialogMessage = (message: string) => {
    this.dialogMessage = message;
  };

  openDialog = (message: string) => {
    this.setDialogMessage(message);
    this.setIsDialogOpen(true);
  };

  closeDialog = () => {
    this.setIsDialogOpen(false);
  };
}

export const dialogStore = new DialogStore();
