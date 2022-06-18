import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';
import { IDisposedWasteMySuffix, DisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';

import { DisposedWasteMySuffixUpdateComponent } from './disposed-waste-my-suffix-update.component';

describe('DisposedWasteMySuffix Management Update Component', () => {
  let comp: DisposedWasteMySuffixUpdateComponent;
  let fixture: ComponentFixture<DisposedWasteMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disposedWasteService: DisposedWasteMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DisposedWasteMySuffixUpdateComponent],
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
      .overrideTemplate(DisposedWasteMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisposedWasteMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disposedWasteService = TestBed.inject(DisposedWasteMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const disposedWaste: IDisposedWasteMySuffix = { id: 456 };

      activatedRoute.data = of({ disposedWaste });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(disposedWaste));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisposedWasteMySuffix>>();
      const disposedWaste = { id: 123 };
      jest.spyOn(disposedWasteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disposedWaste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disposedWaste }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(disposedWasteService.update).toHaveBeenCalledWith(disposedWaste);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisposedWasteMySuffix>>();
      const disposedWaste = new DisposedWasteMySuffix();
      jest.spyOn(disposedWasteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disposedWaste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disposedWaste }));
      saveSubject.complete();

      // THEN
      expect(disposedWasteService.create).toHaveBeenCalledWith(disposedWaste);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisposedWasteMySuffix>>();
      const disposedWaste = { id: 123 };
      jest.spyOn(disposedWasteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disposedWaste });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disposedWasteService.update).toHaveBeenCalledWith(disposedWaste);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
