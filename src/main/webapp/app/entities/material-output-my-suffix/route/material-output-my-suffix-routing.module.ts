import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaterialOutputMySuffixComponent } from '../list/material-output-my-suffix.component';
import { MaterialOutputMySuffixDetailComponent } from '../detail/material-output-my-suffix-detail.component';
import { MaterialOutputMySuffixUpdateComponent } from '../update/material-output-my-suffix-update.component';
import { MaterialOutputMySuffixRoutingResolveService } from './material-output-my-suffix-routing-resolve.service';

const materialOutputRoute: Routes = [
  {
    path: '',
    component: MaterialOutputMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialOutputMySuffixDetailComponent,
    resolve: {
      materialOutput: MaterialOutputMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialOutputMySuffixUpdateComponent,
    resolve: {
      materialOutput: MaterialOutputMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialOutputMySuffixUpdateComponent,
    resolve: {
      materialOutput: MaterialOutputMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(materialOutputRoute)],
  exports: [RouterModule],
})
export class MaterialOutputMySuffixRoutingModule {}
