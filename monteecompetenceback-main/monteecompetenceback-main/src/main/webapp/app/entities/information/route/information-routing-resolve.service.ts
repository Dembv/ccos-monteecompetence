import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInformation } from '../information.model';
import { InformationService } from '../service/information.service';

export const informationResolve = (route: ActivatedRouteSnapshot): Observable<null | IInformation> => {
  const id = route.params['id'];
  if (id) {
    return inject(InformationService)
      .find(id)
      .pipe(
        mergeMap((information: HttpResponse<IInformation>) => {
          if (information.body) {
            return of(information.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default informationResolve;
