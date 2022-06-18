import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisposedWasteMySuffixComponent } from './list/disposed-waste-my-suffix.component';
import { DisposedWasteMySuffixDetailComponent } from './detail/disposed-waste-my-suffix-detail.component';
import { DisposedWasteMySuffixUpdateComponent } from './update/disposed-waste-my-suffix-update.component';
import { DisposedWasteMySuffixDeleteDialogComponent } from './delete/disposed-waste-my-suffix-delete-dialog.component';
import { DisposedWasteMySuffixRoutingModule } from './route/disposed-waste-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, DisposedWasteMySuffixRoutingModule],
  declarations: [
    DisposedWasteMySuffixComponent,
    DisposedWasteMySuffixDetailComponent,
    DisposedWasteMySuffixUpdateComponent,
    DisposedWasteMySuffixDeleteDialogComponent,
  ],
  entryComponents: [DisposedWasteMySuffixDeleteDialogComponent],
})
export class DisposedWasteMySuffixModule {}
