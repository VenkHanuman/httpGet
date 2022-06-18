import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDisposedWasteMySuffix, DisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';
import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

@Component({
  selector: 'jhi-disposed-waste-my-suffix-update',
  templateUrl: './disposed-waste-my-suffix-update.component.html',
})
export class DisposedWasteMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    subTotal: [],
  });

  constructor(
    protected disposedWasteService: DisposedWasteMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disposedWaste }) => {
      this.updateForm(disposedWaste);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disposedWaste = this.createFromForm();
    if (disposedWaste.id !== undefined) {
      this.subscribeToSaveResponse(this.disposedWasteService.update(disposedWaste));
    } else {
      this.subscribeToSaveResponse(this.disposedWasteService.create(disposedWaste));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisposedWasteMySuffix>>): void {
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

  protected updateForm(disposedWaste: IDisposedWasteMySuffix): void {
    this.editForm.patchValue({
      id: disposedWaste.id,
      subTotal: disposedWaste.subTotal,
    });
  }

  protected createFromForm(): IDisposedWasteMySuffix {
    return {
      ...new DisposedWasteMySuffix(),
      id: this.editForm.get(['id'])!.value,
      subTotal: this.editForm.get(['subTotal'])!.value,
    };
  }
}
