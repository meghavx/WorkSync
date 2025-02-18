import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './auth/register-login/register-login.component';

export const routes: Routes = [
  { path: '', component: RegisterLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage',
    loadComponent: () => {
      return import('./features/project-management/project-management.component')
        .then(m => m.ProjectManagementComponent);
      }
  },
  { path: 'dashboard',
    loadComponent: () => {
      return import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent);
      }
  }
];