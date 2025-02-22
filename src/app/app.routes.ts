import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './auth/register-login/register-login.component';
import { CreateProjectComponent } from './features/project-management/create-project/create-project.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: RegisterLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage',
    loadComponent: () => {
      return import('./features/project/project-details.component')
        .then(m => m.ProjectDetailsComponent);
      }
  },
  { path: 'dashboard',
    loadComponent: () => {
      return import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent);
      }
  },
  { path: 'create-project', component: CreateProjectComponent }
];