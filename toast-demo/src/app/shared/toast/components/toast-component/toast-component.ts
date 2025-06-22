import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast-service';
import { ToastType } from '../../models/toast-type.enum';
import { Subscription } from 'rxjs';
import { ToastMessage } from '../../models/toast-message.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-toast-component',
  imports: [
    CommonModule,
    MatIconModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css'
})
export class ToastComponent {
  public toastService = inject(ToastService);
  public toastType = ToastType;

  toastMessage = this.toastService.toastMessage;
  progress = signal(100);

  constructor() {
    effect(() => {
      const toast = this.toastMessage();
      if (!toast?.visible || !toast.startTime) return;

      const durationMs = toast.durationInSeconds * 1000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - toast.startTime!;
        const pct = 100 - (elapsed / durationMs) * 100;
        this.progress.set(Math.max(0, pct));
        if (pct <= 0) clearInterval(interval);
      }, 100);

      return () => clearInterval(interval);
    });
  }

  public close(): void {
    const current = this.toastMessage();
    if (current) {
      this.toastService['_toastMessage'].set({ ...current, visible: false });
    }
  }

  get positionClasses(): string {
  const pos = this.toastMessage()?.position;

  switch (pos) {
    case 'position-top-left':
      return 'top-4 left-4';
    case 'position-top-right':
      return 'top-4 right-4';
    case 'position-bottom-left':
      return 'bottom-4 left-4';
    case 'position-bottom-right':
      return 'bottom-4 right-4';
    case 'position-center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    default:
      return 'top-4 right-4';
  }
}

}
