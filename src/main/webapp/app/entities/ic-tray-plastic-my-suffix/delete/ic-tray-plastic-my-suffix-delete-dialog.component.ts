import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';

@Component({
  templateUrl: './ic-tray-plastic-my-suffix-delete-dialog.component.html',
})
export class ICTrayPlasticMySuffixDeleteDialogComponent {
  iCTrayPlastic?: IICTrayPlasticMySuffix;

  constructor(protected iCTrayPlasticService: ICTrayPlasticMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.iCTrayPlasticService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
