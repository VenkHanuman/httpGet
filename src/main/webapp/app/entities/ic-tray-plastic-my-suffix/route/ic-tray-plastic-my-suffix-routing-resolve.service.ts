import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IICTrayPlasticMySuffix, ICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class ICTrayPlasticMySuffixRoutingResolveService implements Resolve<IICTrayPlasticMySuffix> {
  constructor(protected service: ICTrayPlasticMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IICTrayPlasticMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((iCTrayPlastic: HttpResponse<ICTrayPlasticMySuffix>) => {
          if (iCTrayPlastic.body) {
            return of(iCTrayPlastic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ICTrayPlasticMySuffix());
  }
}
