jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

import { DisposedWasteMySuffixDeleteDialogComponent } from './disposed-waste-my-suffix-delete-dialog.component';

describe('DisposedWasteMySuffix Management Delete Component', () => {
  let comp: DisposedWasteMySuffixDeleteDialogComponent;
  let fixture: ComponentFixture<DisposedWasteMySuffixDeleteDialogComponent>;
  let service: DisposedWasteMySuffixService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DisposedWasteMySuffixDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(DisposedWasteMySuffixDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisposedWasteMySuffixDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DisposedWasteMySuffixService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
