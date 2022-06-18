import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGRNLotMySuffix } from '../grn-lot-my-suffix.model';
import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';

@Component({
  templateUrl: './grn-lot-my-suffix-delete-dialog.component.html',
})
export class GRNLotMySuffixDeleteDialogComponent {
  gRNLot?: IGRNLotMySuffix;

  constructor(protected gRNLotService: GRNLotMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gRNLotService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
