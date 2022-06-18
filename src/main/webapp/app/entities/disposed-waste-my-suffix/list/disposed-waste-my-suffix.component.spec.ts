import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

import { DisposedWasteMySuffixComponent } from './disposed-waste-my-suffix.component';

describe('DisposedWasteMySuffix Management Component', () => {
  let comp: DisposedWasteMySuffixComponent;
  let fixture: ComponentFixture<DisposedWasteMySuffixComponent>;
  let service: DisposedWasteMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DisposedWasteMySuffixComponent],
    })
      .overrideTemplate(DisposedWasteMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisposedWasteMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DisposedWasteMySuffixService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.disposedWastes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
