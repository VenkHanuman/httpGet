import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';
import { IMaterialOutputMySuffix, MaterialOutputMySuffix } from '../material-output-my-suffix.model';

import { MaterialOutputMySuffixUpdateComponent } from './material-output-my-suffix-update.component';

describe('MaterialOutputMySuffix Management Update Component', () => {
  let comp: MaterialOutputMySuffixUpdateComponent;
  let fixture: ComponentFixture<MaterialOutputMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let materialOutputService: MaterialOutputMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MaterialOutputMySuffixUpdateComponent],
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
      .overrideTemplate(MaterialOutputMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialOutputMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    materialOutputService = TestBed.inject(MaterialOutputMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const materialOutput: IMaterialOutputMySuffix = { id: 456 };

      activatedRoute.data = of({ materialOutput });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(materialOutput));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialOutputMySuffix>>();
      const materialOutput = { id: 123 };
      jest.spyOn(materialOutputService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialOutput });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialOutput }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(materialOutputService.update).toHaveBeenCalledWith(materialOutput);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialOutputMySuffix>>();
      const materialOutput = new MaterialOutputMySuffix();
      jest.spyOn(materialOutputService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialOutput });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialOutput }));
      saveSubject.complete();

      // THEN
      expect(materialOutputService.create).toHaveBeenCalledWith(materialOutput);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialOutputMySuffix>>();
      const materialOutput = { id: 123 };
      jest.spyOn(materialOutputService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialOutput });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(materialOutputService.update).toHaveBeenCalledWith(materialOutput);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
