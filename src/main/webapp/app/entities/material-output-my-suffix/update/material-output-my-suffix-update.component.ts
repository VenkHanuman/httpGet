import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMaterialOutputMySuffix, MaterialOutputMySuffix } from '../material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';
import { MaterialType } from 'app/entities/enumerations/material-type.model';

@Component({
  selector: 'jhi-material-output-my-suffix-update',
  templateUrl: './material-output-my-suffix-update.component.html',
})
export class MaterialOutputMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  materialTypeValues = Object.keys(MaterialType);

  editForm = this.fb.group({
    id: [],
    typeOfMatrial: [],
    subTotal: [],
  });

  constructor(
    protected materialOutputService: MaterialOutputMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materialOutput }) => {
      this.updateForm(materialOutput);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materialOutput = this.createFromForm();
    if (materialOutput.id !== undefined) {
      this.subscribeToSaveResponse(this.materialOutputService.update(materialOutput));
    } else {
      this.subscribeToSaveResponse(this.materialOutputService.create(materialOutput));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterialOutputMySuffix>>): void {
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

  protected updateForm(materialOutput: IMaterialOutputMySuffix): void {
    this.editForm.patchValue({
      id: materialOutput.id,
      typeOfMatrial: materialOutput.typeOfMatrial,
      subTotal: materialOutput.subTotal,
    });
  }

  protected createFromForm(): IMaterialOutputMySuffix {
    return {
      ...new MaterialOutputMySuffix(),
      id: this.editForm.get(['id'])!.value,
      typeOfMatrial: this.editForm.get(['typeOfMatrial'])!.value,
      subTotal: this.editForm.get(['subTotal'])!.value,
    };
  }
}
