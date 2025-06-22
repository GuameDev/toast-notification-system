import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ToastService } from '../../services/toast-service/toast-service';
import { ToastMessage } from '../../models/toast-message.model';
import { ToastType } from '../../models/toast-type.enum';
import { ToastPosition } from '../../models/toast-position.enum';
import { PROGRESS_INITIAL_PERCENT, PROGRESS_UPDATE_INTERVAL_MS, TOAST_TIMEOUT_MS_MULTIPLIER } from '../../constants/toast.constants';

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
      const progress = signal<number>(PROGRESS_INITIAL_PERCENT);
      this.progressMap.set(toast.id, progress);

      const interval = setInterval(() => {
        const elapsedMs = Date.now() - (toast.startTime ?? 0);
        const durationMs = toast.durationInSeconds * TOAST_TIMEOUT_MS_MULTIPLIER;

        const percentRemaining = PROGRESS_INITIAL_PERCENT - (elapsedMs / durationMs) * PROGRESS_INITIAL_PERCENT;

        progress.set(Math.max(0, percentRemaining));

        if (percentRemaining <= 0) {
          clearInterval(interval);
        }
      }, PROGRESS_UPDATE_INTERVAL_MS);
    }

    return this.progressMap.get(toast.id)?.() ?? 0;

  }
}
