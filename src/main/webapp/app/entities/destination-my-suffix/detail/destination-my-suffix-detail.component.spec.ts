import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DestinationMySuffixDetailComponent } from './destination-my-suffix-detail.component';

describe('DestinationMySuffix Management Detail Component', () => {
  let comp: DestinationMySuffixDetailComponent;
  let fixture: ComponentFixture<DestinationMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinationMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ destination: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DestinationMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DestinationMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load destination on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.destination).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
