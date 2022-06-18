import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GRNLotMySuffixComponent } from '../list/grn-lot-my-suffix.component';
import { GRNLotMySuffixDetailComponent } from '../detail/grn-lot-my-suffix-detail.component';
import { GRNLotMySuffixUpdateComponent } from '../update/grn-lot-my-suffix-update.component';
import { GRNLotMySuffixRoutingResolveService } from './grn-lot-my-suffix-routing-resolve.service';

const gRNLotRoute: Routes = [
  {
    path: '',
    component: GRNLotMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GRNLotMySuffixDetailComponent,
    resolve: {
      gRNLot: GRNLotMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GRNLotMySuffixUpdateComponent,
    resolve: {
      gRNLot: GRNLotMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GRNLotMySuffixUpdateComponent,
    resolve: {
      gRNLot: GRNLotMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(gRNLotRoute)],
  exports: [RouterModule],
})
export class GRNLotMySuffixRoutingModule {}
