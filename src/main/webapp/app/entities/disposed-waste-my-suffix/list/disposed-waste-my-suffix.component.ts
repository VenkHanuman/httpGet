import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';
import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';
import { DisposedWasteMySuffixDeleteDialogComponent } from '../delete/disposed-waste-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-disposed-waste-my-suffix',
  templateUrl: './disposed-waste-my-suffix.component.html',
})
export class DisposedWasteMySuffixComponent implements OnInit {
  disposedWastes?: IDisposedWasteMySuffix[];
  isLoading = false;

  constructor(protected disposedWasteService: DisposedWasteMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.disposedWasteService.query().subscribe({
      next: (res: HttpResponse<IDisposedWasteMySuffix[]>) => {
        this.isLoading = false;
        this.disposedWastes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDisposedWasteMySuffix): number {
    return item.id!;
  }

  delete(disposedWaste: IDisposedWasteMySuffix): void {
    const modalRef = this.modalService.open(DisposedWasteMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.disposedWaste = disposedWaste;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
