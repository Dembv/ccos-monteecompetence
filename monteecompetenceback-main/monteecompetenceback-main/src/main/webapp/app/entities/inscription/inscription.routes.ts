import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { InscriptionComponent } from './list/inscription.component';
import { InscriptionDetailComponent } from './detail/inscription-detail.component';
import { InscriptionUpdateComponent } from './update/inscription-update.component';
import InscriptionResolve from './route/inscription-routing-resolve.service';

const inscriptionRoute: Routes = [
  {
    path: '',
    component: InscriptionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscriptionDetailComponent,
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscriptionUpdateComponent,
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscriptionUpdateComponent,
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default inscriptionRoute;
