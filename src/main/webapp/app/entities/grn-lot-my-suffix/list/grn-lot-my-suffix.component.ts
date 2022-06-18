import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGRNLotMySuffix } from '../grn-lot-my-suffix.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';
import { GRNLotMySuffixDeleteDialogComponent } from '../delete/grn-lot-my-suffix-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-grn-lot-my-suffix',
  templateUrl: './grn-lot-my-suffix.component.html',
})
export class GRNLotMySuffixComponent implements OnInit {
  gRNLots: IGRNLotMySuffix[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected gRNLotService: GRNLotMySuffixService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
    this.gRNLots = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.isLoading = true;

    this.gRNLotService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IGRNLotMySuffix[]>) => {
          this.isLoading = false;
          this.paginateGRNLots(res.body, res.headers);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  reset(): void {
    this.page = 0;
    this.gRNLots = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IGRNLotMySuffix): number {
    return item.id!;
  }

  delete(gRNLot: IGRNLotMySuffix): void {
    const modalRef = this.modalService.open(GRNLotMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gRNLot = gRNLot;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateGRNLots(data: IGRNLotMySuffix[] | null, headers: HttpHeaders): void {
    const linkHeader = headers.get('link');
    if (linkHeader) {
      this.links = this.parseLinks.parse(linkHeader);
    } else {
      this.links = {
        last: 0,
      };
    }
    if (data) {
      for (const d of data) {
        this.gRNLots.push(d);
      }
    }
  }
}
