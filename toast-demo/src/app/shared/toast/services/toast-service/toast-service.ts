import { Injectable, signal, computed } from '@angular/core';
import { ToastMessage } from '../../models/toast-message.model';
import { ToastType } from '../../models/toast-type.enum';
import { ToastPosition } from '../../models/toast-position.enum';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toastMessage = signal<ToastMessage | null>(null);

  toastMessage = computed(() => this._toastMessage());

  public show(
    title: string,
    message: string,
    durationInSeconds: number,
    toastType: ToastType,
    position: ToastPosition
  ): void {
    if (durationInSeconds <= 0) {
      durationInSeconds = 5;
    }

    const toast = new ToastMessage(true);
    toast.durationInSeconds = durationInSeconds;
    toast.title = title;
    toast.message = message;
    toast.type = toastType;
    toast.position = position;

    this._toastMessage.set(toast);

    setTimeout(() => {
      this._toastMessage.set({ ...toast, visible: false });
    }, durationInSeconds * 1000);
  }
}
