import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OutputBundleMySuffixComponent } from './list/output-bundle-my-suffix.component';
import { OutputBundleMySuffixDetailComponent } from './detail/output-bundle-my-suffix-detail.component';
import { OutputBundleMySuffixUpdateComponent } from './update/output-bundle-my-suffix-update.component';
import { OutputBundleMySuffixDeleteDialogComponent } from './delete/output-bundle-my-suffix-delete-dialog.component';
import { OutputBundleMySuffixRoutingModule } from './route/output-bundle-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, OutputBundleMySuffixRoutingModule],
  declarations: [
    OutputBundleMySuffixComponent,
    OutputBundleMySuffixDetailComponent,
    OutputBundleMySuffixUpdateComponent,
    OutputBundleMySuffixDeleteDialogComponent,
  ],
  entryComponents: [OutputBundleMySuffixDeleteDialogComponent],
})
export class OutputBundleMySuffixModule {}
