import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGRNLotMySuffix } from '../grn-lot-my-suffix.model';

@Component({
  selector: 'jhi-grn-lot-my-suffix-detail',
  templateUrl: './grn-lot-my-suffix-detail.component.html',
})
export class GRNLotMySuffixDetailComponent implements OnInit {
  gRNLot: IGRNLotMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gRNLot }) => {
      this.gRNLot = gRNLot;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
