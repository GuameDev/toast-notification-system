import { Component } from '@angular/core';
import { ToastService } from '../../shared/toast/services/toast-service/toast-service';
import { ToastType } from '../../shared/toast/models/toast-type.enum';
import { ToastPosition } from '../../shared/toast/models/toast-position.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DEFAULT_TOAST_DURATION_SECONDS, DEFAULT_TOAST_MESSAGE, DEFAULT_TOAST_TITLE } from '../../shared/toast/constants/toast.constants';
import { ShowToastOptions } from '../../shared/toast/models/show-toast-options.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePageComponent {
  toastTypeControl = new FormControl<ToastType>(ToastType.Success);
  toastPositionControl = new FormControl<ToastPosition>(ToastPosition.TopRight);
  toastTitleControl = new FormControl(DEFAULT_TOAST_TITLE);
  toastMessageControl = new FormControl(DEFAULT_TOAST_MESSAGE);
  toastDurationControl = new FormControl(5);

  ToastType = ToastType;
  ToastPosition = ToastPosition;

  toastTypes = Object.values(ToastType);
  toastPositions = Object.values(ToastPosition);

  constructor(private toastService: ToastService) { }


  showToast(): void {
    const options: ShowToastOptions = {
      title: this.toastTitleControl.value?.trim() || DEFAULT_TOAST_TITLE,
      message: this.toastMessageControl.value?.trim() || DEFAULT_TOAST_MESSAGE,
      durationInSeconds: this.toastDurationControl.value ?? DEFAULT_TOAST_DURATION_SECONDS,
      type: this.toastTypeControl.value ?? ToastType.Info,
      position: this.toastPositionControl.value ?? ToastPosition.TopRight
    };

    this.toastService.show(options);
  }
}
