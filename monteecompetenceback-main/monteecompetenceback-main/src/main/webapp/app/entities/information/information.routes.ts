import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { InformationComponent } from './list/information.component';
import { InformationDetailComponent } from './detail/information-detail.component';
import { InformationUpdateComponent } from './update/information-update.component';
import InformationResolve from './route/information-routing-resolve.service';

const informationRoute: Routes = [
  {
    path: '',
    component: InformationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InformationDetailComponent,
    resolve: {
      information: InformationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InformationUpdateComponent,
    resolve: {
      information: InformationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InformationUpdateComponent,
    resolve: {
      information: InformationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default informationRoute;
