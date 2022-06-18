import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDestinationMySuffix, DestinationMySuffix } from '../destination-my-suffix.model';
import { DestinationMySuffixService } from '../service/destination-my-suffix.service';
import { IMaterialOutputMySuffix } from 'app/entities/material-output-my-suffix/material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from 'app/entities/material-output-my-suffix/service/material-output-my-suffix.service';

@Component({
  selector: 'jhi-destination-my-suffix-update',
  templateUrl: './destination-my-suffix-update.component.html',
})
export class DestinationMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  materialOutputsSharedCollection: IMaterialOutputMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    materialOutput: [],
  });

  constructor(
    protected destinationService: DestinationMySuffixService,
    protected materialOutputService: MaterialOutputMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ destination }) => {
      this.updateForm(destination);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const destination = this.createFromForm();
    if (destination.id !== undefined) {
      this.subscribeToSaveResponse(this.destinationService.update(destination));
    } else {
      this.subscribeToSaveResponse(this.destinationService.create(destination));
    }
  }

  trackMaterialOutputMySuffixById(_index: number, item: IMaterialOutputMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDestinationMySuffix>>): void {
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

  protected updateForm(destination: IDestinationMySuffix): void {
    this.editForm.patchValue({
      id: destination.id,
      name: destination.name,
      materialOutput: destination.materialOutput,
    });

    this.materialOutputsSharedCollection = this.materialOutputService.addMaterialOutputMySuffixToCollectionIfMissing(
      this.materialOutputsSharedCollection,
      destination.materialOutput
    );
  }

  protected loadRelationshipsOptions(): void {
    this.materialOutputService
      .query()
      .pipe(map((res: HttpResponse<IMaterialOutputMySuffix[]>) => res.body ?? []))
      .pipe(
        map((materialOutputs: IMaterialOutputMySuffix[]) =>
          this.materialOutputService.addMaterialOutputMySuffixToCollectionIfMissing(
            materialOutputs,
            this.editForm.get('materialOutput')!.value
          )
        )
      )
      .subscribe((materialOutputs: IMaterialOutputMySuffix[]) => (this.materialOutputsSharedCollection = materialOutputs));
  }

  protected createFromForm(): IDestinationMySuffix {
    return {
      ...new DestinationMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      materialOutput: this.editForm.get(['materialOutput'])!.value,
    };
  }
}
