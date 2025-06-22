import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy } from '@angular/core';
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

  public close(): void {
    const current = this.toastMessage();
    if (current) {
      this.toastService['_toastMessage'].set({ ...current, visible: false });
    }
  }
}
