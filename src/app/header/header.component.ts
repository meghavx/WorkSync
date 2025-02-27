import { Component, inject } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  // imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);

  logout() {
    if (window.confirm('You will be logged out!')) {
      this.router.navigate(['/register-login']);
    }
  }
}
