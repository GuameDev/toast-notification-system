import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ToastService } from '../../services/toast-service/toast-service';
import { ToastMessage } from '../../models/toast-message.model';
import { ToastType } from '../../models/toast-type.enum';
import { ToastPosition } from '../../models/toast-position.enum';
import { TOAST_TIMEOUT_MS_MULTIPLIER } from '../../constants/toast.constants';

@Component({
  standalone: true,
  selector: 'app-toast-component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
  readonly toastType = ToastType;
  readonly toasts = this.toastService.toasts;

  progressMap = new Map<string, WritableSignal<number>>();


  getPositionClasses(position: ToastPosition): string {
    switch (position) {
      case ToastPosition.TopLeft:
        return 'top-4 left-4';
      case ToastPosition.TopRight:
        return 'top-4 right-4';
      case ToastPosition.BottomLeft:
        return 'bottom-4 left-4';
      case ToastPosition.BottomRight:
        return 'bottom-4 right-4';
      case ToastPosition.Center:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-4 right-4';
    }
  }

  close(id: string): void {
    this.toastService.dismiss(id);
  }

  getProgress(toast: ToastMessage): number {
    if (!this.progressMap.has(toast.id)) {
      const progress = signal(100);
      this.progressMap.set(toast.id, progress);

      const interval = setInterval(() => {
        const elapsed = Date.now() - (toast.startTime ?? 0);
        const pct = 100 - (elapsed / (toast.durationInSeconds * TOAST_TIMEOUT_MS_MULTIPLIER)) * 100;
        progress.set(Math.max(0, pct));
        if (pct <= 0) clearInterval(interval);
      }, 100);
    }

    return this.progressMap.get(toast.id)?.() ?? 0;

  }
}
