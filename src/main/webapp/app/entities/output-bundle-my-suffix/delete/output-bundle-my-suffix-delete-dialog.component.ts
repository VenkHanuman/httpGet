import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IOutputBundleMySuffix } from '../output-bundle-my-suffix.model';
import { OutputBundleMySuffixService } from '../service/output-bundle-my-suffix.service';

@Component({
  templateUrl: './output-bundle-my-suffix-delete-dialog.component.html',
})
export class OutputBundleMySuffixDeleteDialogComponent {
  outputBundle?: IOutputBundleMySuffix;

  constructor(protected outputBundleService: OutputBundleMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.outputBundleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
