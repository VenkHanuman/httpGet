import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';
import { ICTrayPlasticMySuffixDeleteDialogComponent } from '../delete/ic-tray-plastic-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-ic-tray-plastic-my-suffix',
  templateUrl: './ic-tray-plastic-my-suffix.component.html',
})
export class ICTrayPlasticMySuffixComponent implements OnInit {
  iCTrayPlastics?: IICTrayPlasticMySuffix[];
  isLoading = false;

  constructor(protected iCTrayPlasticService: ICTrayPlasticMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.iCTrayPlasticService.query().subscribe({
      next: (res: HttpResponse<IICTrayPlasticMySuffix[]>) => {
        this.isLoading = false;
        this.iCTrayPlastics = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IICTrayPlasticMySuffix): number {
    return item.id!;
  }

  delete(iCTrayPlastic: IICTrayPlasticMySuffix): void {
    const modalRef = this.modalService.open(ICTrayPlasticMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.iCTrayPlastic = iCTrayPlastic;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
