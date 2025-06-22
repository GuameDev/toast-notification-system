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
}
