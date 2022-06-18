import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OutputBundleMySuffixDetailComponent } from './output-bundle-my-suffix-detail.component';

describe('OutputBundleMySuffix Management Detail Component', () => {
  let comp: OutputBundleMySuffixDetailComponent;
  let fixture: ComponentFixture<OutputBundleMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputBundleMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ outputBundle: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OutputBundleMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OutputBundleMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load outputBundle on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.outputBundle).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
