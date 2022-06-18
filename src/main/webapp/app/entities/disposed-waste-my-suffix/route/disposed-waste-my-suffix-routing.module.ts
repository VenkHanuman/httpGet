import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisposedWasteMySuffixComponent } from '../list/disposed-waste-my-suffix.component';
import { DisposedWasteMySuffixDetailComponent } from '../detail/disposed-waste-my-suffix-detail.component';
import { DisposedWasteMySuffixUpdateComponent } from '../update/disposed-waste-my-suffix-update.component';
import { DisposedWasteMySuffixRoutingResolveService } from './disposed-waste-my-suffix-routing-resolve.service';

const disposedWasteRoute: Routes = [
  {
    path: '',
    component: DisposedWasteMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DisposedWasteMySuffixDetailComponent,
    resolve: {
      disposedWaste: DisposedWasteMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisposedWasteMySuffixUpdateComponent,
    resolve: {
      disposedWaste: DisposedWasteMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DisposedWasteMySuffixUpdateComponent,
    resolve: {
      disposedWaste: DisposedWasteMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disposedWasteRoute)],
  exports: [RouterModule],
})
export class DisposedWasteMySuffixRoutingModule {}
