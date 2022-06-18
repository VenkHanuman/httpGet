import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMaterialMySuffix, MaterialMySuffix } from '../material-my-suffix.model';
import { MaterialMySuffixService } from '../service/material-my-suffix.service';
import { MaterialType } from 'app/entities/enumerations/material-type.model';

@Component({
  selector: 'jhi-material-my-suffix-update',
  templateUrl: './material-my-suffix-update.component.html',
})
export class MaterialMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  materialTypeValues = Object.keys(MaterialType);

  editForm = this.fb.group({
    id: [],
    typeOfMaterial: [],
    subTotalWeight: [],
  });

  constructor(protected materialService: MaterialMySuffixService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.updateForm(material);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const material = this.createFromForm();
    if (material.id !== undefined) {
      this.subscribeToSaveResponse(this.materialService.update(material));
    } else {
      this.subscribeToSaveResponse(this.materialService.create(material));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialMySuffix>>): void {
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

  protected updateForm(material: IMaterialMySuffix): void {
    this.editForm.patchValue({
      id: material.id,
      typeOfMaterial: material.typeOfMaterial,
      subTotalWeight: material.subTotalWeight,
    });
  }

  protected createFromForm(): IMaterialMySuffix {
    return {
      ...new MaterialMySuffix(),
      id: this.editForm.get(['id'])!.value,
      typeOfMaterial: this.editForm.get(['typeOfMaterial'])!.value,
      subTotalWeight: this.editForm.get(['subTotalWeight'])!.value,
    };
  }
}
