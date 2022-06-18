import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ICTrayPlasticMySuffixComponent } from '../list/ic-tray-plastic-my-suffix.component';
import { ICTrayPlasticMySuffixDetailComponent } from '../detail/ic-tray-plastic-my-suffix-detail.component';
import { ICTrayPlasticMySuffixUpdateComponent } from '../update/ic-tray-plastic-my-suffix-update.component';
import { ICTrayPlasticMySuffixRoutingResolveService } from './ic-tray-plastic-my-suffix-routing-resolve.service';

const iCTrayPlasticRoute: Routes = [
  {
    path: '',
    component: ICTrayPlasticMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ICTrayPlasticMySuffixDetailComponent,
    resolve: {
      iCTrayPlastic: ICTrayPlasticMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ICTrayPlasticMySuffixUpdateComponent,
    resolve: {
      iCTrayPlastic: ICTrayPlasticMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ICTrayPlasticMySuffixUpdateComponent,
    resolve: {
      iCTrayPlastic: ICTrayPlasticMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(iCTrayPlasticRoute)],
  exports: [RouterModule],
})
export class ICTrayPlasticMySuffixRoutingModule {}
