import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ICTrayPlasticMySuffixComponent } from './list/ic-tray-plastic-my-suffix.component';
import { ICTrayPlasticMySuffixDetailComponent } from './detail/ic-tray-plastic-my-suffix-detail.component';
import { ICTrayPlasticMySuffixUpdateComponent } from './update/ic-tray-plastic-my-suffix-update.component';
import { ICTrayPlasticMySuffixDeleteDialogComponent } from './delete/ic-tray-plastic-my-suffix-delete-dialog.component';
import { ICTrayPlasticMySuffixRoutingModule } from './route/ic-tray-plastic-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, ICTrayPlasticMySuffixRoutingModule],
  declarations: [
    ICTrayPlasticMySuffixComponent,
    ICTrayPlasticMySuffixDetailComponent,
    ICTrayPlasticMySuffixUpdateComponent,
    ICTrayPlasticMySuffixDeleteDialogComponent,
  ],
  entryComponents: [ICTrayPlasticMySuffixDeleteDialogComponent],
})
export class ICTrayPlasticMySuffixModule {}
