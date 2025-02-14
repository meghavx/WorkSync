import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterLoginComponent } from './register-login/register-login.component';

@Component({
  selector: 'app-root',
  imports: [RegisterLoginComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project-management-dashboard';
}
