import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOutputBundleMySuffix, OutputBundleMySuffix } from '../output-bundle-my-suffix.model';
import { OutputBundleMySuffixService } from '../service/output-bundle-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class OutputBundleMySuffixRoutingResolveService implements Resolve<IOutputBundleMySuffix> {
  constructor(protected service: OutputBundleMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOutputBundleMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((outputBundle: HttpResponse<OutputBundleMySuffix>) => {
          if (outputBundle.body) {
            return of(outputBundle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OutputBundleMySuffix());
  }
}
