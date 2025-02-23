import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './auth/register-login/register-login.component';
import { CreateProjectComponent } from './features/developer/create-project/create-project.component';
import { DashboardComponent } from './features/developer/dashboard/dashboard.component';
import { ProjectDetailsComponent } from './features/project-manager/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: RegisterLoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'dev-dashboard', component: DashboardComponent },
  { path: 'pm-dashboard', component: ProjectDetailsComponent }
];