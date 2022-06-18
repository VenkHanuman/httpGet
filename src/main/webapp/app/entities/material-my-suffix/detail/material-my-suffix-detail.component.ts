import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialMySuffix } from '../material-my-suffix.model';

@Component({
  selector: 'jhi-material-my-suffix-detail',
  templateUrl: './material-my-suffix-detail.component.html',
})
export class MaterialMySuffixDetailComponent implements OnInit {
  material: IMaterialMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.material = material;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
