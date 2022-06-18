import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DestinationMySuffixComponent } from '../list/destination-my-suffix.component';
import { DestinationMySuffixDetailComponent } from '../detail/destination-my-suffix-detail.component';
import { DestinationMySuffixUpdateComponent } from '../update/destination-my-suffix-update.component';
import { DestinationMySuffixRoutingResolveService } from './destination-my-suffix-routing-resolve.service';

const destinationRoute: Routes = [
  {
    path: '',
    component: DestinationMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DestinationMySuffixDetailComponent,
    resolve: {
      destination: DestinationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DestinationMySuffixUpdateComponent,
    resolve: {
      destination: DestinationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DestinationMySuffixUpdateComponent,
    resolve: {
      destination: DestinationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(destinationRoute)],
  exports: [RouterModule],
})
export class DestinationMySuffixRoutingModule {}
