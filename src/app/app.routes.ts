import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterLoginComponent } from './auth/register-login/register-login.component';

export const routes: Routes = [
  { path: '', component: RegisterLoginComponent },
  { path: 'home', component: HomeComponent }
];
