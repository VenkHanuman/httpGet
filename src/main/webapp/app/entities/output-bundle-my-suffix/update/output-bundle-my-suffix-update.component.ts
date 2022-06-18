import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IOutputBundleMySuffix, OutputBundleMySuffix } from '../output-bundle-my-suffix.model';
import { OutputBundleMySuffixService } from '../service/output-bundle-my-suffix.service';

@Component({
  selector: 'jhi-output-bundle-my-suffix-update',
  templateUrl: './output-bundle-my-suffix-update.component.html',
})
export class OutputBundleMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    total: [],
    totalOfDisposableWaste: [],
  });

  constructor(
    protected outputBundleService: OutputBundleMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ outputBundle }) => {
      this.updateForm(outputBundle);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const outputBundle = this.createFromForm();
    if (outputBundle.id !== undefined) {
      this.subscribeToSaveResponse(this.outputBundleService.update(outputBundle));
    } else {
      this.subscribeToSaveResponse(this.outputBundleService.create(outputBundle));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOutputBundleMySuffix>>): void {
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

  protected updateForm(outputBundle: IOutputBundleMySuffix): void {
    this.editForm.patchValue({
      id: outputBundle.id,
      total: outputBundle.total,
      totalOfDisposableWaste: outputBundle.totalOfDisposableWaste,
    });
  }

  protected createFromForm(): IOutputBundleMySuffix {
    return {
      ...new OutputBundleMySuffix(),
      id: this.editForm.get(['id'])!.value,
      total: this.editForm.get(['total'])!.value,
      totalOfDisposableWaste: this.editForm.get(['totalOfDisposableWaste'])!.value,
    };
  }
}
