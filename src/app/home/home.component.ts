import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p>home-page works!</p>
    <router-outlet></router-outlet>
  `
})
export class HomeComponent {}