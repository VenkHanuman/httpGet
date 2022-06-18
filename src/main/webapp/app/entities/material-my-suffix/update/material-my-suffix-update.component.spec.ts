import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MaterialMySuffixService } from '../service/material-my-suffix.service';
import { IMaterialMySuffix, MaterialMySuffix } from '../material-my-suffix.model';

import { MaterialMySuffixUpdateComponent } from './material-my-suffix-update.component';

describe('MaterialMySuffix Management Update Component', () => {
  let comp: MaterialMySuffixUpdateComponent;
  let fixture: ComponentFixture<MaterialMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let materialService: MaterialMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MaterialMySuffixUpdateComponent],
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
      .overrideTemplate(MaterialMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    materialService = TestBed.inject(MaterialMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const material: IMaterialMySuffix = { id: 456 };

      activatedRoute.data = of({ material });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(material));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialMySuffix>>();
      const material = { id: 123 };
      jest.spyOn(materialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: material }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(materialService.update).toHaveBeenCalledWith(material);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialMySuffix>>();
      const material = new MaterialMySuffix();
      jest.spyOn(materialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: material }));
      saveSubject.complete();

      // THEN
      expect(materialService.create).toHaveBeenCalledWith(material);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<MaterialMySuffix>>();
      const material = { id: 123 };
      jest.spyOn(materialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ material });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(materialService.update).toHaveBeenCalledWith(material);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
