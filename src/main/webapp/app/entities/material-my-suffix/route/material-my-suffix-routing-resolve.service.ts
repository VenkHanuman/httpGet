import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaterialMySuffix, MaterialMySuffix } from '../material-my-suffix.model';
import { MaterialMySuffixService } from '../service/material-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class MaterialMySuffixRoutingResolveService implements Resolve<IMaterialMySuffix> {
  constructor(protected service: MaterialMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterialMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((material: HttpResponse<MaterialMySuffix>) => {
          if (material.body) {
            return of(material.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MaterialMySuffix());
  }
}
