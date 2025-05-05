import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/routes').then((m) => m.routes),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/routes').then((m) => m.routes),
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./views/etudiant/routes').then((m) => m.routes),
    canActivate: [authGuard, roleGuard], // Nécessite une authentification
    data: {
      roles: ['ROLE_USER']
    }
  },
  {
    path: 'scolarite',
    loadChildren: () => import('./views/scolarite/routes').then((m) => m.routes),
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
