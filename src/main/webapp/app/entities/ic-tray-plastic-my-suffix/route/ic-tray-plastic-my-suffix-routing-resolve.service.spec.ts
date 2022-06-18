import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IICTrayPlasticMySuffix, ICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';
import { ICTrayPlasticMySuffixService } from '../service/ic-tray-plastic-my-suffix.service';

import { ICTrayPlasticMySuffixRoutingResolveService } from './ic-tray-plastic-my-suffix-routing-resolve.service';

describe('ICTrayPlasticMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ICTrayPlasticMySuffixRoutingResolveService;
  let service: ICTrayPlasticMySuffixService;
  let resultICTrayPlasticMySuffix: IICTrayPlasticMySuffix | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ICTrayPlasticMySuffixRoutingResolveService);
    service = TestBed.inject(ICTrayPlasticMySuffixService);
    resultICTrayPlasticMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IICTrayPlasticMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultICTrayPlasticMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultICTrayPlasticMySuffix).toEqual({ id: 123 });
    });

    it('should return new IICTrayPlasticMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultICTrayPlasticMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultICTrayPlasticMySuffix).toEqual(new ICTrayPlasticMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ICTrayPlasticMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultICTrayPlasticMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultICTrayPlasticMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
