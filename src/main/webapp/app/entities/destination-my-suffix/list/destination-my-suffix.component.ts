import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDestinationMySuffix } from '../destination-my-suffix.model';
import { DestinationMySuffixService } from '../service/destination-my-suffix.service';
import { DestinationMySuffixDeleteDialogComponent } from '../delete/destination-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-destination-my-suffix',
  templateUrl: './destination-my-suffix.component.html',
})
export class DestinationMySuffixComponent implements OnInit {
  destinations?: IDestinationMySuffix[];
  isLoading = false;

  constructor(protected destinationService: DestinationMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.destinationService.query().subscribe({
      next: (res: HttpResponse<IDestinationMySuffix[]>) => {
        this.isLoading = false;
        this.destinations = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDestinationMySuffix): number {
    return item.id!;
  }

  delete(destination: IDestinationMySuffix): void {
    const modalRef = this.modalService.open(DestinationMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.destination = destination;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
