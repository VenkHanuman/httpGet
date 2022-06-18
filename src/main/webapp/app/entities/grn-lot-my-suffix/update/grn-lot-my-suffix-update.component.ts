import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IGRNLotMySuffix, GRNLotMySuffix } from '../grn-lot-my-suffix.model';
import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';

@Component({
  selector: 'jhi-grn-lot-my-suffix-update',
  templateUrl: './grn-lot-my-suffix-update.component.html',
})
export class GRNLotMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    grnCode: [],
    collectionDate: [],
    vehicleNumber: [],
    srcOfMaterials: [],
    totalWeight: [],
  });

  constructor(protected gRNLotService: GRNLotMySuffixService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gRNLot }) => {
      if (gRNLot.id === undefined) {
        const today = dayjs().startOf('day');
        gRNLot.collectionDate = today;
      }

      this.updateForm(gRNLot);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gRNLot = this.createFromForm();
    if (gRNLot.id !== undefined) {
      this.subscribeToSaveResponse(this.gRNLotService.update(gRNLot));
    } else {
      this.subscribeToSaveResponse(this.gRNLotService.create(gRNLot));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGRNLotMySuffix>>): void {
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

  protected updateForm(gRNLot: IGRNLotMySuffix): void {
    this.editForm.patchValue({
      id: gRNLot.id,
      grnCode: gRNLot.grnCode,
      collectionDate: gRNLot.collectionDate ? gRNLot.collectionDate.format(DATE_TIME_FORMAT) : null,
      vehicleNumber: gRNLot.vehicleNumber,
      srcOfMaterials: gRNLot.srcOfMaterials,
      totalWeight: gRNLot.totalWeight,
    });
  }

  protected createFromForm(): IGRNLotMySuffix {
    return {
      ...new GRNLotMySuffix(),
      id: this.editForm.get(['id'])!.value,
      grnCode: this.editForm.get(['grnCode'])!.value,
      collectionDate: this.editForm.get(['collectionDate'])!.value
        ? dayjs(this.editForm.get(['collectionDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      vehicleNumber: this.editForm.get(['vehicleNumber'])!.value,
      srcOfMaterials: this.editForm.get(['srcOfMaterials'])!.value,
      totalWeight: this.editForm.get(['totalWeight'])!.value,
    };
  }
}
