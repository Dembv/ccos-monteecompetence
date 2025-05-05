import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'reset/finish',
    loadComponent: () => import('./reset/reset.component').then(m => m.ResetComponent)
  }
];
