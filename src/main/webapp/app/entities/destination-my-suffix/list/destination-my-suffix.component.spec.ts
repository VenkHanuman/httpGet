import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DestinationMySuffixService } from '../service/destination-my-suffix.service';

import { DestinationMySuffixComponent } from './destination-my-suffix.component';

describe('DestinationMySuffix Management Component', () => {
  let comp: DestinationMySuffixComponent;
  let fixture: ComponentFixture<DestinationMySuffixComponent>;
  let service: DestinationMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DestinationMySuffixComponent],
    })
      .overrideTemplate(DestinationMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DestinationMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DestinationMySuffixService);

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
    expect(comp.destinations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
