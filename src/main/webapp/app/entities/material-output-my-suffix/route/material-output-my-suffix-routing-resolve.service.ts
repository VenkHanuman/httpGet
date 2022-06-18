import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMaterialOutputMySuffix, MaterialOutputMySuffix } from '../material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class MaterialOutputMySuffixRoutingResolveService implements Resolve<IMaterialOutputMySuffix> {
  constructor(protected service: MaterialOutputMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterialOutputMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((materialOutput: HttpResponse<MaterialOutputMySuffix>) => {
          if (materialOutput.body) {
            return of(materialOutput.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MaterialOutputMySuffix());
  }
}
