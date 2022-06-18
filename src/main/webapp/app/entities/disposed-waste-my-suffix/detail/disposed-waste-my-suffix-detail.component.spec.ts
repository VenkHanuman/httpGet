import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DisposedWasteMySuffixDetailComponent } from './disposed-waste-my-suffix-detail.component';

describe('DisposedWasteMySuffix Management Detail Component', () => {
  let comp: DisposedWasteMySuffixDetailComponent;
  let fixture: ComponentFixture<DisposedWasteMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisposedWasteMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ disposedWaste: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DisposedWasteMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisposedWasteMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load disposedWaste on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.disposedWaste).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
