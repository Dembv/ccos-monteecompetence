import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./etudiant-espace/etudiant-espace.component').then(m => m.EtudiantEspaceComponent),
    data: {
      roles: ['ROLE_USER']
    }
  }
];
