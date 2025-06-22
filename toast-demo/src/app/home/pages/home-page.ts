import { Component } from '@angular/core';
import { ToastService } from '../../shared/toast/services/toast-service/toast-service';
import { ToastType } from '../../shared/toast/models/toast-type.enum';
import { ToastPosition } from '../../shared/toast/models/toast-position.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePageComponent {
  toastTypeControl = new FormControl<ToastType>(ToastType.Success);
  toastPositionControl = new FormControl<ToastPosition>(ToastPosition.TopRight);
  toastTitleControl = new FormControl('Toast Title');
  toastMessageControl = new FormControl('This is a sample toast message');
  toastDurationControl = new FormControl(5);

  ToastType = ToastType;
  ToastPosition = ToastPosition;

  toastTypes = Object.values(ToastType);
  toastPositions = Object.values(ToastPosition);

  constructor(private toastService: ToastService) {}

  showToast() {
    console.log(this.toastDurationControl.value)
    this.toastService.show(
      this.toastTitleControl.value ?? 'Title',
      this.toastMessageControl.value ?? 'This is a message',
      this.toastDurationControl.value ?? 5,
      this.toastTypeControl.value ?? ToastType.Info,
      this.toastPositionControl.value ?? ToastPosition.TopRight
    );
  }
}
