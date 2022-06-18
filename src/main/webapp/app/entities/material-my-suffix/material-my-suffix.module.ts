import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialMySuffixComponent } from './list/material-my-suffix.component';
import { MaterialMySuffixDetailComponent } from './detail/material-my-suffix-detail.component';
import { MaterialMySuffixUpdateComponent } from './update/material-my-suffix-update.component';
import { MaterialMySuffixDeleteDialogComponent } from './delete/material-my-suffix-delete-dialog.component';
import { MaterialMySuffixRoutingModule } from './route/material-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, MaterialMySuffixRoutingModule],
  declarations: [
    MaterialMySuffixComponent,
    MaterialMySuffixDetailComponent,
    MaterialMySuffixUpdateComponent,
    MaterialMySuffixDeleteDialogComponent,
  ],
  entryComponents: [MaterialMySuffixDeleteDialogComponent],
})
export class MaterialMySuffixModule {}
