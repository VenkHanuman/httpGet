import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';
import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

@Component({
  templateUrl: './disposed-waste-my-suffix-delete-dialog.component.html',
})
export class DisposedWasteMySuffixDeleteDialogComponent {
  disposedWaste?: IDisposedWasteMySuffix;

  constructor(protected disposedWasteService: DisposedWasteMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.disposedWasteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
