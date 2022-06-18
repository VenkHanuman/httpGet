import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';

import { MaterialOutputMySuffixComponent } from './material-output-my-suffix.component';

describe('MaterialOutputMySuffix Management Component', () => {
  let comp: MaterialOutputMySuffixComponent;
  let fixture: ComponentFixture<MaterialOutputMySuffixComponent>;
  let service: MaterialOutputMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MaterialOutputMySuffixComponent],
    })
      .overrideTemplate(MaterialOutputMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialOutputMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MaterialOutputMySuffixService);

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
    expect(comp.materialOutputs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
