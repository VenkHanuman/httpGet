import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';
import { IICTrayPlasticMySuffix, ICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { IMaterialMySuffix } from 'app/entities/material-my-suffix/material-my-suffix.model';
import { MaterialMySuffixService } from 'app/entities/material-my-suffix/service/material-my-suffix.service';

import { ICTrayPlasticMySuffixUpdateComponent } from './ic-tray-plastic-my-suffix-update.component';

describe('ICTrayPlasticMySuffix Management Update Component', () => {
  let comp: ICTrayPlasticMySuffixUpdateComponent;
  let fixture: ComponentFixture<ICTrayPlasticMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let iCTrayPlasticService: ICTrayPlasticMySuffixService;
  let materialService: MaterialMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ICTrayPlasticMySuffixUpdateComponent],
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
      .overrideTemplate(ICTrayPlasticMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ICTrayPlasticMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    iCTrayPlasticService = TestBed.inject(ICTrayPlasticMySuffixService);
    materialService = TestBed.inject(MaterialMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call MaterialMySuffix query and add missing value', () => {
      const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 456 };
      const material: IMaterialMySuffix = { id: 63544 };
      iCTrayPlastic.material = material;

      const materialCollection: IMaterialMySuffix[] = [{ id: 57941 }];
      jest.spyOn(materialService, 'query').mockReturnValue(of(new HttpResponse({ body: materialCollection })));
      const additionalMaterialMySuffixes = [material];
      const expectedCollection: IMaterialMySuffix[] = [...additionalMaterialMySuffixes, ...materialCollection];
      jest.spyOn(materialService, 'addMaterialMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ iCTrayPlastic });
      comp.ngOnInit();

      expect(materialService.query).toHaveBeenCalled();
      expect(materialService.addMaterialMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        materialCollection,
        ...additionalMaterialMySuffixes
      );
      expect(comp.materialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 456 };
      const material: IMaterialMySuffix = { id: 72167 };
      iCTrayPlastic.material = material;

      activatedRoute.data = of({ iCTrayPlastic });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(iCTrayPlastic));
      expect(comp.materialsSharedCollection).toContain(material);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICTrayPlasticMySuffix>>();
      const iCTrayPlastic = { id: 123 };
      jest.spyOn(iCTrayPlasticService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ iCTrayPlastic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: iCTrayPlastic }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(iCTrayPlasticService.update).toHaveBeenCalledWith(iCTrayPlastic);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICTrayPlasticMySuffix>>();
      const iCTrayPlastic = new ICTrayPlasticMySuffix();
      jest.spyOn(iCTrayPlasticService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ iCTrayPlastic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: iCTrayPlastic }));
      saveSubject.complete();

      // THEN
      expect(iCTrayPlasticService.create).toHaveBeenCalledWith(iCTrayPlastic);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICTrayPlasticMySuffix>>();
      const iCTrayPlastic = { id: 123 };
      jest.spyOn(iCTrayPlasticService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ iCTrayPlastic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(iCTrayPlasticService.update).toHaveBeenCalledWith(iCTrayPlastic);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackMaterialMySuffixById', () => {
      it('Should return tracked MaterialMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMaterialMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
