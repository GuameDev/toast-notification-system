import { ToastPosition } from "./toast-position.enum";
import { ToastType } from "./toast-type.enum";

export interface ShowToastOptions {
  title: string;
  message: string;
  durationInSeconds?: number;
  type: ToastType;
  position: ToastPosition;
}
