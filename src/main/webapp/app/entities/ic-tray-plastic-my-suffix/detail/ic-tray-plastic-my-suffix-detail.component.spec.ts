import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ICTrayPlasticMySuffixDetailComponent } from './ic-tray-plastic-my-suffix-detail.component';

describe('ICTrayPlasticMySuffix Management Detail Component', () => {
  let comp: ICTrayPlasticMySuffixDetailComponent;
  let fixture: ComponentFixture<ICTrayPlasticMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ICTrayPlasticMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ iCTrayPlastic: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ICTrayPlasticMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ICTrayPlasticMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load iCTrayPlastic on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.iCTrayPlastic).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
