import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';

import { ICTrayPlasticMySuffixComponent } from './ic-tray-plastic-my-suffix.component';

describe('ICTrayPlasticMySuffix Management Component', () => {
  let comp: ICTrayPlasticMySuffixComponent;
  let fixture: ComponentFixture<ICTrayPlasticMySuffixComponent>;
  let service: ICTrayPlasticMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ICTrayPlasticMySuffixComponent],
    })
      .overrideTemplate(ICTrayPlasticMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ICTrayPlasticMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ICTrayPlasticMySuffixService);

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
    expect(comp.iCTrayPlastics?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
