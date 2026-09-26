import { HomeComponent } from './components/home/home.component';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('global-notice');
}