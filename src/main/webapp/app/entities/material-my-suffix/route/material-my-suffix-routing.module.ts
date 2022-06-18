import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaterialMySuffixComponent } from '../list/material-my-suffix.component';
import { MaterialMySuffixDetailComponent } from '../detail/material-my-suffix-detail.component';
import { MaterialMySuffixUpdateComponent } from '../update/material-my-suffix-update.component';
import { MaterialMySuffixRoutingResolveService } from './material-my-suffix-routing-resolve.service';

const materialRoute: Routes = [
  {
    path: '',
    component: MaterialMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialMySuffixDetailComponent,
    resolve: {
      material: MaterialMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialMySuffixUpdateComponent,
    resolve: {
      material: MaterialMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialMySuffixUpdateComponent,
    resolve: {
      material: MaterialMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialRoute)],
  exports: [RouterModule],
})
export class MaterialMySuffixRoutingModule {}
