import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialOutputMySuffix } from '../material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';

@Component({
  templateUrl: './material-output-my-suffix-delete-dialog.component.html',
})
export class MaterialOutputMySuffixDeleteDialogComponent {
  materialOutput?: IMaterialOutputMySuffix;

  constructor(protected materialOutputService: MaterialOutputMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialOutputService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
