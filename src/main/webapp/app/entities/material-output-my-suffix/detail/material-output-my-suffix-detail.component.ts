import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaterialOutputMySuffix } from '../material-output-my-suffix.model';

@Component({
  selector: 'jhi-material-output-my-suffix-detail',
  templateUrl: './material-output-my-suffix-detail.component.html',
})
export class MaterialOutputMySuffixDetailComponent implements OnInit {
  materialOutput: IMaterialOutputMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialOutput }) => {
      this.materialOutput = materialOutput;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
