import { Injectable, signal, computed } from '@angular/core';
import { ToastMessage } from '../../models/toast-message.model';
import { ToastType } from '../../models/toast-type.enum';
import { ToastPosition } from '../../models/toast-position.enum';
import { DEFAULT_TOAST_DURATION_SECONDS, TOAST_TIMEOUT_MS_MULTIPLIER } from '../../constants/toast.constants';
import { ShowToastOptions } from '../../models/show-toast-options.model';


@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toastMessage = signal<ToastMessage | null>(null);

  public readonly toastMessage = computed(() => this._toastMessage());

  public show(options: ShowToastOptions): void {
    const duration = options.durationInSeconds ?? DEFAULT_TOAST_DURATION_SECONDS;
    const toast = new ToastMessage({ ...options, visible: true, durationInSeconds: duration, startTime: Date.now() });
    this._toastMessage.set(toast);
    setTimeout(() => this._toastMessage.set({ ...toast, visible: false }), duration * TOAST_TIMEOUT_MS_MULTIPLIER);
  }

}
