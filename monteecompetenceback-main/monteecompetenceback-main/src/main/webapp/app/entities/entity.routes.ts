import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'etudiant',
    data: { pageTitle: 'monteecompetencebackApp.etudiant.home.title' },
    loadChildren: () => import('./etudiant/etudiant.routes'),
  },
  {
    path: 'niveau',
    data: { pageTitle: 'monteecompetencebackApp.niveau.home.title' },
    loadChildren: () => import('./niveau/niveau.routes'),
  },
  {
    path: 'annee-academique',
    data: { pageTitle: 'monteecompetencebackApp.anneeAcademique.home.title' },
    loadChildren: () => import('./annee-academique/annee-academique.routes'),
  },
  {
    path: 'formation',
    data: { pageTitle: 'monteecompetencebackApp.formation.home.title' },
    loadChildren: () => import('./formation/formation.routes'),
  },
  {
    path: 'information',
    data: { pageTitle: 'monteecompetencebackApp.information.home.title' },
    loadChildren: () => import('./information/information.routes'),
  },
  {
    path: 'inscription',
    data: { pageTitle: 'monteecompetencebackApp.inscription.home.title' },
    loadChildren: () => import('./inscription/inscription.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
