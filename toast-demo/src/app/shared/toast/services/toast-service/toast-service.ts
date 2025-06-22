import { Injectable, NgZone, signal, computed } from '@angular/core';
import { Toast } from '../../models/toast.model';
import { ShowToastOptions } from '../../models/show-toast-options.model';
// ...

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  public readonly toasts = this._toasts.asReadonly();

  constructor(private zone: NgZone) {}

  public show(options: ShowToastOptions): void {
    const toast = new Toast({
      ...options,
      visible: true,
      startTime: Date.now(),
    });

    this.zone.run(() => {
      this._toasts.update((prev) => [...prev, toast]);
    });

    setTimeout(() => {
      this.zone.run(() => {
        this.dismiss(toast.id);
      });
    }, toast.durationInSeconds * 1000);
  }

  public dismiss(id: string): void {
    this.zone.run(() => {
      this._toasts.update((toasts) => toasts.filter(t => t.id !== id));
    });
  }

  public clear(): void {
    this.zone.run(() => {
      this._toasts.set([]);
    });
  }
}
