import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialOutputMySuffixComponent } from './list/material-output-my-suffix.component';
import { MaterialOutputMySuffixDetailComponent } from './detail/material-output-my-suffix-detail.component';
import { MaterialOutputMySuffixUpdateComponent } from './update/material-output-my-suffix-update.component';
import { MaterialOutputMySuffixDeleteDialogComponent } from './delete/material-output-my-suffix-delete-dialog.component';
import { MaterialOutputMySuffixRoutingModule } from './route/material-output-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, MaterialOutputMySuffixRoutingModule],
  declarations: [
    MaterialOutputMySuffixComponent,
    MaterialOutputMySuffixDetailComponent,
    MaterialOutputMySuffixUpdateComponent,
    MaterialOutputMySuffixDeleteDialogComponent,
  ],
  entryComponents: [MaterialOutputMySuffixDeleteDialogComponent],
})
export class MaterialOutputMySuffixModule {}
