import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GRNLotMySuffixDetailComponent } from './grn-lot-my-suffix-detail.component';

describe('GRNLotMySuffix Management Detail Component', () => {
  let comp: GRNLotMySuffixDetailComponent;
  let fixture: ComponentFixture<GRNLotMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GRNLotMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ gRNLot: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GRNLotMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GRNLotMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load gRNLot on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.gRNLot).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
