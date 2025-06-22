import { ToastType } from './toast-type.enum';
import { ToastPosition } from './toast-position.enum';
import {
  DEFAULT_TOAST_DURATION_SECONDS,
  DEFAULT_TOAST_MESSAGE,
  DEFAULT_TOAST_TITLE
} from '../constants/toast.constants';

export class Toast {
  public id: string; 
  public visible: boolean;
  public title: string;
  public message: string;
  public durationInSeconds: number;
  public position: ToastPosition;
  public type: ToastType;
  public startTime?: number;

  constructor({
    id = crypto.randomUUID(),
    visible = true,
    title = DEFAULT_TOAST_TITLE,
    message = DEFAULT_TOAST_MESSAGE,
    durationInSeconds = DEFAULT_TOAST_DURATION_SECONDS,
    position = ToastPosition.Center,
    type = ToastType.Info,
    startTime
  }: Partial<Toast> = {}) {
    this.id = id;
    this.visible = visible;
    this.title = title;
    this.message = message;
    this.durationInSeconds = durationInSeconds;
    this.position = position;
    this.type = type;
    this.startTime = startTime;
  }
}
