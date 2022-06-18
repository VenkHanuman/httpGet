import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GRNLotMySuffixComponent } from './list/grn-lot-my-suffix.component';
import { GRNLotMySuffixDetailComponent } from './detail/grn-lot-my-suffix-detail.component';
import { GRNLotMySuffixUpdateComponent } from './update/grn-lot-my-suffix-update.component';
import { GRNLotMySuffixDeleteDialogComponent } from './delete/grn-lot-my-suffix-delete-dialog.component';
import { GRNLotMySuffixRoutingModule } from './route/grn-lot-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, GRNLotMySuffixRoutingModule],
  declarations: [
    GRNLotMySuffixComponent,
    GRNLotMySuffixDetailComponent,
    GRNLotMySuffixUpdateComponent,
    GRNLotMySuffixDeleteDialogComponent,
  ],
  entryComponents: [GRNLotMySuffixDeleteDialogComponent],
})
export class GRNLotMySuffixModule {}
