import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGRNLotMySuffix, GRNLotMySuffix } from '../grn-lot-my-suffix.model';
import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class GRNLotMySuffixRoutingResolveService implements Resolve<IGRNLotMySuffix> {
  constructor(protected service: GRNLotMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGRNLotMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((gRNLot: HttpResponse<GRNLotMySuffix>) => {
          if (gRNLot.body) {
            return of(gRNLot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GRNLotMySuffix());
  }
}
