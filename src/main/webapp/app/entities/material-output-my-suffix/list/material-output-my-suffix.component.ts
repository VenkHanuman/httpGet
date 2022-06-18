import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterialOutputMySuffix } from '../material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';
import { MaterialOutputMySuffixDeleteDialogComponent } from '../delete/material-output-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-material-output-my-suffix',
  templateUrl: './material-output-my-suffix.component.html',
})
export class MaterialOutputMySuffixComponent implements OnInit {
  materialOutputs?: IMaterialOutputMySuffix[];
  isLoading = false;

  constructor(protected materialOutputService: MaterialOutputMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.materialOutputService.query().subscribe({
      next: (res: HttpResponse<IMaterialOutputMySuffix[]>) => {
        this.isLoading = false;
        this.materialOutputs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IMaterialOutputMySuffix): number {
    return item.id!;
  }

  delete(materialOutput: IMaterialOutputMySuffix): void {
    const modalRef = this.modalService.open(MaterialOutputMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.materialOutput = materialOutput;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
