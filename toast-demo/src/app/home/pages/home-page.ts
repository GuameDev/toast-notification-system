import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../shared/toast/services/toast-service/toast-service';
import { ToastType } from '../../shared/toast/models/toast-type.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePageComponent {
  toastTypeControl = new FormControl<ToastType>(ToastType.Success);

  ToastType = ToastType;
  toastTypes = Object.values(ToastType);

  constructor(private toastService: ToastService) {}

  showToast() {
    const type = this.toastTypeControl.value ?? ToastType.Info;
    this.toastService.show(`This is a ${type} toast`, type);
  }
}