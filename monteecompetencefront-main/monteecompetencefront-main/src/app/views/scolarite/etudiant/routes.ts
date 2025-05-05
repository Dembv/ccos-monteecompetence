import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./scolarite-etudiant-liste/scolarite-etudiant-liste.component').then(m => m.ScolariteEtudiantListeComponent),
  }
];
