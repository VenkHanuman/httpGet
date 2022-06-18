import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MaterialOutputMySuffixDetailComponent } from './material-output-my-suffix-detail.component';

describe('MaterialOutputMySuffix Management Detail Component', () => {
  let comp: MaterialOutputMySuffixDetailComponent;
  let fixture: ComponentFixture<MaterialOutputMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialOutputMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ materialOutput: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MaterialOutputMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MaterialOutputMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load materialOutput on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.materialOutput).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
