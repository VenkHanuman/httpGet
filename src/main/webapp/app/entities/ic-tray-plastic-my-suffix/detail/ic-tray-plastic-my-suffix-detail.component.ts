import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';

@Component({
  selector: 'jhi-ic-tray-plastic-my-suffix-detail',
  templateUrl: './ic-tray-plastic-my-suffix-detail.component.html',
})
export class ICTrayPlasticMySuffixDetailComponent implements OnInit {
  iCTrayPlastic: IICTrayPlasticMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ iCTrayPlastic }) => {
      this.iCTrayPlastic = iCTrayPlastic;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
