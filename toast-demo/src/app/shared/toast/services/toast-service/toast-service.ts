import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../../models/toast-message.model';
import { ToastType } from '../../models/toast-type.enum';
import { BehaviorSubject } from 'rxjs';
import { ToastPosition } from '../../models/toast-position.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastState = new BehaviorSubject<ToastMessage>(new ToastMessage(false));


  public show(
    title: string,
    message: string,
    duartionInSeconds: number,
    toastType: ToastType,
    position: ToastPosition
  ): void {
    if (duartionInSeconds <= 0) {
      duartionInSeconds = 5;
    }
    let toast = new ToastMessage(true);
    toast.durationInSeconds = duartionInSeconds;
    toast.title = title;
    toast.message = message;
    toast.type = toastType;
    toast.position = position;

    this.toastState.next(toast);
    setTimeout(() => {
      this.toastState.next(new ToastMessage(false));
    }, duartionInSeconds * 1000);
  }

}
