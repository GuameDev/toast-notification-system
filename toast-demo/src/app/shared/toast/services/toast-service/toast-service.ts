import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../../models/toast-message.model';
import { ShowToastOptions } from '../../models/show-toast-options.model';
import {
  DEFAULT_TOAST_DURATION_SECONDS,
  TOAST_TIMEOUT_MS_MULTIPLIER
} from '../../constants/toast.constants';

@Injectable({ providedIn: 'root' })
export class ToastService {
  // 🔐 Signal reactivo para lista de toasts
  private readonly _toasts = signal<ToastMessage[]>([]);
  public readonly toasts = this._toasts.asReadonly();

  /**
   * Muestra un nuevo toast. Se autoelimina luego de su duración.
   */
  public show(options: ShowToastOptions): void {
    const duration = options.durationInSeconds ?? DEFAULT_TOAST_DURATION_SECONDS;

    const toast = new ToastMessage({
      ...options,
      visible: true,
      durationInSeconds: duration,
      startTime: Date.now(),
    });

    this._toasts.update((prev) => [...prev, toast]);

    // ⏱️ Programar eliminación automática
    setTimeout(() => this.dismiss(toast.id), duration * TOAST_TIMEOUT_MS_MULTIPLIER);
  }

  /**
   * Elimina un toast específico por ID
   */
  public dismiss(id: string): void {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  /**
   * Limpia todos los toasts (por ejemplo, en navegación)
   */
  public clear(): void {
    this._toasts.set([]);
  }
}
