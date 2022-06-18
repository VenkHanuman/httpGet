import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDestinationMySuffix, DestinationMySuffix } from '../destination-my-suffix.model';
import { DestinationMySuffixService } from '../service/destination-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class DestinationMySuffixRoutingResolveService implements Resolve<IDestinationMySuffix> {
  constructor(protected service: DestinationMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDestinationMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((destination: HttpResponse<DestinationMySuffix>) => {
          if (destination.body) {
            return of(destination.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DestinationMySuffix());
  }
}
