import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOutputBundleMySuffix } from '../output-bundle-my-suffix.model';

@Component({
  selector: 'jhi-output-bundle-my-suffix-detail',
  templateUrl: './output-bundle-my-suffix-detail.component.html',
})
export class OutputBundleMySuffixDetailComponent implements OnInit {
  outputBundle: IOutputBundleMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ outputBundle }) => {
      this.outputBundle = outputBundle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
