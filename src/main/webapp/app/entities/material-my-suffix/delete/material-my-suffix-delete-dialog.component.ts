import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialMySuffix } from '../material-my-suffix.model';
import { MaterialMySuffixService } from '../service/material-my-suffix.service';

@Component({
  templateUrl: './material-my-suffix-delete-dialog.component.html',
})
export class MaterialMySuffixDeleteDialogComponent {
  material?: IMaterialMySuffix;

  constructor(protected materialService: MaterialMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
