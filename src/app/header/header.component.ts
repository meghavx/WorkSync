import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li routerLink="/home">Home</li>
          <li routerLink="/manage">Manage</li>
          <li routerLink="/dashboard">Dashboard</li>
        </ul>
      </nav>
    </header>
  `,
  styles: `
    header {
      background-color: #333;
      padding: 1.5em 1em;
      font-size: 1.25em;
    }

    ul {
      display: flex;
      gap: 1em;
      color: #fff;
      font-variant: small-caps;
    }

    li {
      list-style: none;
      cursor: pointer;
    }
  `
})
export class HeaderComponent {}
