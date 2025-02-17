import { Component } from '@angular/core';
import { RegisterLoginComponent } from './register-login/register-login.component';

@Component({
  selector: 'app-root',
  imports: [RegisterLoginComponent],
  template: `<app-register-login></app-register-login>`
})
export class AppComponent {
  title = 'project-management-dashboard';
}
