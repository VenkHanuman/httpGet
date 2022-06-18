import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IICTrayPlasticMySuffix, ICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';
import { IMaterialMySuffix } from 'app/entities/material-my-suffix/material-my-suffix.model';
import { MaterialMySuffixService } from 'app/entities/material-my-suffix/service/material-my-suffix.service';

@Component({
  selector: 'jhi-ic-tray-plastic-my-suffix-update',
  templateUrl: './ic-tray-plastic-my-suffix-update.component.html',
})
export class ICTrayPlasticMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  materialsSharedCollection: IMaterialMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    brandName: [],
    material: [],
  });

  constructor(
    protected iCTrayPlasticService: ICTrayPlasticMySuffixService,
    protected materialService: MaterialMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ iCTrayPlastic }) => {
      this.updateForm(iCTrayPlastic);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const iCTrayPlastic = this.createFromForm();
    if (iCTrayPlastic.id !== undefined) {
      this.subscribeToSaveResponse(this.iCTrayPlasticService.update(iCTrayPlastic));
    } else {
      this.subscribeToSaveResponse(this.iCTrayPlasticService.create(iCTrayPlastic));
    }
  }

  trackMaterialMySuffixById(_index: number, item: IMaterialMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IICTrayPlasticMySuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(iCTrayPlastic: IICTrayPlasticMySuffix): void {
    this.editForm.patchValue({
      id: iCTrayPlastic.id,
      brandName: iCTrayPlastic.brandName,
      material: iCTrayPlastic.material,
    });

    this.materialsSharedCollection = this.materialService.addMaterialMySuffixToCollectionIfMissing(
      this.materialsSharedCollection,
      iCTrayPlastic.material
    );
  }

  protected loadRelationshipsOptions(): void {
    this.materialService
      .query()
      .pipe(map((res: HttpResponse<IMaterialMySuffix[]>) => res.body ?? []))
      .pipe(
        map((materials: IMaterialMySuffix[]) =>
          this.materialService.addMaterialMySuffixToCollectionIfMissing(materials, this.editForm.get('material')!.value)
        )
      )
      .subscribe((materials: IMaterialMySuffix[]) => (this.materialsSharedCollection = materials));
  }

  protected createFromForm(): IICTrayPlasticMySuffix {
    return {
      ...new ICTrayPlasticMySuffix(),
      id: this.editForm.get(['id'])!.value,
      brandName: this.editForm.get(['brandName'])!.value,
      material: this.editForm.get(['material'])!.value,
    };
  }
}
