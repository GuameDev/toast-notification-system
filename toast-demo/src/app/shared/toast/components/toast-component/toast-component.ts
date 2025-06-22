import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast-service';
import { ToastType } from '../../models/toast-type.enum';
import { Subscription } from 'rxjs';
import { ToastMessage } from '../../models/toast-message.model';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-toast-component',
  imports: [
     CommonModule,
      LucideAngularModule.pick({ CheckCircle })],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css'
})
export class ToastComponent implements OnDestroy {

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  public toastService = inject(ToastService);
  private toastSubscription: Subscription;
  public toastType = ToastType;
  public toastMessage?: ToastMessage;

  constructor() {
    this.toastSubscription = this.toastService.toastState.subscribe((toastMessage) => {
      this.toastMessage = toastMessage;
    })
  }

  public close(): void {
    if (!this.toastMessage)
      return;

    this.toastMessage.visible = false;
  }

}