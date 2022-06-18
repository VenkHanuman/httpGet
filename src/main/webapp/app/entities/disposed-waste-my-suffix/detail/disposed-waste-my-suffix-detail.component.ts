import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';

@Component({
  selector: 'jhi-disposed-waste-my-suffix-detail',
  templateUrl: './disposed-waste-my-suffix-detail.component.html',
})
export class DisposedWasteMySuffixDetailComponent implements OnInit {
  disposedWaste: IDisposedWasteMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disposedWaste }) => {
      this.disposedWaste = disposedWaste;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
