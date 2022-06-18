import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DestinationMySuffixService } from '../service/destination-my-suffix.service';
import { IDestinationMySuffix, DestinationMySuffix } from '../destination-my-suffix.model';
import { IMaterialOutputMySuffix } from 'app/entities/material-output-my-suffix/material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from 'app/entities/material-output-my-suffix/service/material-output-my-suffix.service';

import { DestinationMySuffixUpdateComponent } from './destination-my-suffix-update.component';

describe('DestinationMySuffix Management Update Component', () => {
  let comp: DestinationMySuffixUpdateComponent;
  let fixture: ComponentFixture<DestinationMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let destinationService: DestinationMySuffixService;
  let materialOutputService: MaterialOutputMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DestinationMySuffixUpdateComponent],
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
      .overrideTemplate(DestinationMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DestinationMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    destinationService = TestBed.inject(DestinationMySuffixService);
    materialOutputService = TestBed.inject(MaterialOutputMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call MaterialOutputMySuffix query and add missing value', () => {
      const destination: IDestinationMySuffix = { id: 456 };
      const materialOutput: IMaterialOutputMySuffix = { id: 12773 };
      destination.materialOutput = materialOutput;

      const materialOutputCollection: IMaterialOutputMySuffix[] = [{ id: 19727 }];
      jest.spyOn(materialOutputService, 'query').mockReturnValue(of(new HttpResponse({ body: materialOutputCollection })));
      const additionalMaterialOutputMySuffixes = [materialOutput];
      const expectedCollection: IMaterialOutputMySuffix[] = [...additionalMaterialOutputMySuffixes, ...materialOutputCollection];
      jest.spyOn(materialOutputService, 'addMaterialOutputMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ destination });
      comp.ngOnInit();

      expect(materialOutputService.query).toHaveBeenCalled();
      expect(materialOutputService.addMaterialOutputMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        materialOutputCollection,
        ...additionalMaterialOutputMySuffixes
      );
      expect(comp.materialOutputsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const destination: IDestinationMySuffix = { id: 456 };
      const materialOutput: IMaterialOutputMySuffix = { id: 49858 };
      destination.materialOutput = materialOutput;

      activatedRoute.data = of({ destination });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(destination));
      expect(comp.materialOutputsSharedCollection).toContain(materialOutput);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DestinationMySuffix>>();
      const destination = { id: 123 };
      jest.spyOn(destinationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ destination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: destination }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(destinationService.update).toHaveBeenCalledWith(destination);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DestinationMySuffix>>();
      const destination = new DestinationMySuffix();
      jest.spyOn(destinationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ destination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: destination }));
      saveSubject.complete();

      // THEN
      expect(destinationService.create).toHaveBeenCalledWith(destination);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DestinationMySuffix>>();
      const destination = { id: 123 };
      jest.spyOn(destinationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ destination });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(destinationService.update).toHaveBeenCalledWith(destination);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackMaterialOutputMySuffixById', () => {
      it('Should return tracked MaterialOutputMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMaterialOutputMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
