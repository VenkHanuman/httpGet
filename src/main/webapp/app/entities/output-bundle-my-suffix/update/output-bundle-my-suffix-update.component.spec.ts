import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OutputBundleMySuffixService } from '../service/output-bundle-my-suffix.service';
import { IOutputBundleMySuffix, OutputBundleMySuffix } from '../output-bundle-my-suffix.model';

import { OutputBundleMySuffixUpdateComponent } from './output-bundle-my-suffix-update.component';

describe('OutputBundleMySuffix Management Update Component', () => {
  let comp: OutputBundleMySuffixUpdateComponent;
  let fixture: ComponentFixture<OutputBundleMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let outputBundleService: OutputBundleMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OutputBundleMySuffixUpdateComponent],
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
      .overrideTemplate(OutputBundleMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OutputBundleMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    outputBundleService = TestBed.inject(OutputBundleMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const outputBundle: IOutputBundleMySuffix = { id: 456 };

      activatedRoute.data = of({ outputBundle });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(outputBundle));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OutputBundleMySuffix>>();
      const outputBundle = { id: 123 };
      jest.spyOn(outputBundleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outputBundle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outputBundle }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(outputBundleService.update).toHaveBeenCalledWith(outputBundle);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OutputBundleMySuffix>>();
      const outputBundle = new OutputBundleMySuffix();
      jest.spyOn(outputBundleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outputBundle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: outputBundle }));
      saveSubject.complete();

      // THEN
      expect(outputBundleService.create).toHaveBeenCalledWith(outputBundle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<OutputBundleMySuffix>>();
      const outputBundle = { id: 123 };
      jest.spyOn(outputBundleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ outputBundle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(outputBundleService.update).toHaveBeenCalledWith(outputBundle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
