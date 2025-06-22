import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/components/toast-component/toast-component';
import { HomePageComponent } from './home/pages/home-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent,HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'toast-demo';
}
