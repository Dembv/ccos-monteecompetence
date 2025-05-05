import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./scolarite-inscription-liste/scolarite-inscription-liste.component').then(m => m.ScolariteInscriptionListeComponent),
  },
];
