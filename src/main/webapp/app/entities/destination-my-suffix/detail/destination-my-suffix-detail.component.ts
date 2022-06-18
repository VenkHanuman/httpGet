import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDestinationMySuffix } from '../destination-my-suffix.model';

@Component({
  selector: 'jhi-destination-my-suffix-detail',
  templateUrl: './destination-my-suffix-detail.component.html',
})
export class DestinationMySuffixDetailComponent implements OnInit {
  destination: IDestinationMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ destination }) => {
      this.destination = destination;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
