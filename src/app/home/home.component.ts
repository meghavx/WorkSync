import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <h3>Welcome to the Home Page!</h3>
    <router-outlet></router-outlet>
  `
})
export class HomeComponent {}