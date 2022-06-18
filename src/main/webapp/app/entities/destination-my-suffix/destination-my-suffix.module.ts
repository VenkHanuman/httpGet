import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DestinationMySuffixComponent } from './list/destination-my-suffix.component';
import { DestinationMySuffixDetailComponent } from './detail/destination-my-suffix-detail.component';
import { DestinationMySuffixUpdateComponent } from './update/destination-my-suffix-update.component';
import { DestinationMySuffixDeleteDialogComponent } from './delete/destination-my-suffix-delete-dialog.component';
import { DestinationMySuffixRoutingModule } from './route/destination-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, DestinationMySuffixRoutingModule],
  declarations: [
    DestinationMySuffixComponent,
    DestinationMySuffixDetailComponent,
    DestinationMySuffixUpdateComponent,
    DestinationMySuffixDeleteDialogComponent,
  ],
  entryComponents: [DestinationMySuffixDeleteDialogComponent],
})
export class DestinationMySuffixModule {}
