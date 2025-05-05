import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./scolarite-dashboard/scolarite-dashboard.component').then(m => m.ScolariteDashboardComponent),
  },
  {
    path: 'etudiant',
    loadChildren: () =>
      import('./etudiant/routes').then((m) => m.routes)
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./inscription/routes').then((m) => m.routes)
  },
  {
    path: 'formation',
    loadComponent: () =>
      import('./formation/formation.component').then((m) => m.FormationComponent)
  },
  {
    path: 'niveau',
    loadComponent: () => import('./niveau/niveau.component').then((m) => m.NiveauComponent)
  },
  {
    path: 'annee-academique',
    loadComponent: () => import('./annee-academique/annee-academique.component').then((m) => m.AnneeAcademiqueComponent)
  },
  {
    path: 'information',
    loadComponent: () => import('./information/information.component').then((m) => m.InformationComponent)
  }
];


