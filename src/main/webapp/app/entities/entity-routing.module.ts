import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'grn-lot-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.gRNLot.home.title' },
        loadChildren: () => import('./grn-lot-my-suffix/grn-lot-my-suffix.module').then(m => m.GRNLotMySuffixModule),
      },
      {
        path: 'material-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.material.home.title' },
        loadChildren: () => import('./material-my-suffix/material-my-suffix.module').then(m => m.MaterialMySuffixModule),
      },
      {
        path: 'ic-tray-plastic-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.iCTrayPlastic.home.title' },
        loadChildren: () => import('./ic-tray-plastic-my-suffix/ic-tray-plastic-my-suffix.module').then(m => m.ICTrayPlasticMySuffixModule),
      },
      {
        path: 'disposed-waste-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.disposedWaste.home.title' },
        loadChildren: () => import('./disposed-waste-my-suffix/disposed-waste-my-suffix.module').then(m => m.DisposedWasteMySuffixModule),
      },
      {
        path: 'material-output-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.materialOutput.home.title' },
        loadChildren: () =>
          import('./material-output-my-suffix/material-output-my-suffix.module').then(m => m.MaterialOutputMySuffixModule),
      },
      {
        path: 'destination-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.destination.home.title' },
        loadChildren: () => import('./destination-my-suffix/destination-my-suffix.module').then(m => m.DestinationMySuffixModule),
      },
      {
        path: 'output-bundle-my-suffix',
        data: { pageTitle: 'invMgmtApplicationApp.outputBundle.home.title' },
        loadChildren: () => import('./output-bundle-my-suffix/output-bundle-my-suffix.module').then(m => m.OutputBundleMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
