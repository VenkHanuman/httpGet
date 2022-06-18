import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OutputBundleMySuffixComponent } from '../list/output-bundle-my-suffix.component';
import { OutputBundleMySuffixDetailComponent } from '../detail/output-bundle-my-suffix-detail.component';
import { OutputBundleMySuffixUpdateComponent } from '../update/output-bundle-my-suffix-update.component';
import { OutputBundleMySuffixRoutingResolveService } from './output-bundle-my-suffix-routing-resolve.service';

const outputBundleRoute: Routes = [
  {
    path: '',
    component: OutputBundleMySuffixComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OutputBundleMySuffixDetailComponent,
    resolve: {
      outputBundle: OutputBundleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OutputBundleMySuffixUpdateComponent,
    resolve: {
      outputBundle: OutputBundleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OutputBundleMySuffixUpdateComponent,
    resolve: {
      outputBundle: OutputBundleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(outputBundleRoute)],
  exports: [RouterModule],
})
export class OutputBundleMySuffixRoutingModule {}
