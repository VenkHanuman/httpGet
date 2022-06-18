import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaterialMySuffixDetailComponent } from './material-my-suffix-detail.component';

describe('MaterialMySuffix Management Detail Component', () => {
  let comp: MaterialMySuffixDetailComponent;
  let fixture: ComponentFixture<MaterialMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ material: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MaterialMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaterialMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load material on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.material).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
