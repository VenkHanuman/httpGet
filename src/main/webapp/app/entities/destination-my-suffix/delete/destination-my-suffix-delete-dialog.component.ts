import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDestinationMySuffix } from '../destination-my-suffix.model';
import { DestinationMySuffixService } from '../service/destination-my-suffix.service';

@Component({
  templateUrl: './destination-my-suffix-delete-dialog.component.html',
})
export class DestinationMySuffixDeleteDialogComponent {
  destination?: IDestinationMySuffix;

  constructor(protected destinationService: DestinationMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.destinationService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
