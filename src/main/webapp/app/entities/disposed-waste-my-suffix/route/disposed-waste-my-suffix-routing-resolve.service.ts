import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisposedWasteMySuffix, DisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';
import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class DisposedWasteMySuffixRoutingResolveService implements Resolve<IDisposedWasteMySuffix> {
  constructor(protected service: DisposedWasteMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisposedWasteMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disposedWaste: HttpResponse<DisposedWasteMySuffix>) => {
          if (disposedWaste.body) {
            return of(disposedWaste.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DisposedWasteMySuffix());
  }
}
