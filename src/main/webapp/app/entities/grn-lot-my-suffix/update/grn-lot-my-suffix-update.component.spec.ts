import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';
import { IGRNLotMySuffix, GRNLotMySuffix } from '../grn-lot-my-suffix.model';

import { GRNLotMySuffixUpdateComponent } from './grn-lot-my-suffix-update.component';

describe('GRNLotMySuffix Management Update Component', () => {
  let comp: GRNLotMySuffixUpdateComponent;
  let fixture: ComponentFixture<GRNLotMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gRNLotService: GRNLotMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GRNLotMySuffixUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GRNLotMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GRNLotMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gRNLotService = TestBed.inject(GRNLotMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const gRNLot: IGRNLotMySuffix = { id: 456 };

      activatedRoute.data = of({ gRNLot });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(gRNLot));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GRNLotMySuffix>>();
      const gRNLot = { id: 123 };
      jest.spyOn(gRNLotService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gRNLot });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gRNLot }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(gRNLotService.update).toHaveBeenCalledWith(gRNLot);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GRNLotMySuffix>>();
      const gRNLot = new GRNLotMySuffix();
      jest.spyOn(gRNLotService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gRNLot });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gRNLot }));
      saveSubject.complete();

      // THEN
      expect(gRNLotService.create).toHaveBeenCalledWith(gRNLot);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<GRNLotMySuffix>>();
      const gRNLot = { id: 123 };
      jest.spyOn(gRNLotService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gRNLot });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gRNLotService.update).toHaveBeenCalledWith(gRNLot);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
