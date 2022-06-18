import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IGRNLotMySuffix, GRNLotMySuffix } from '../grn-lot-my-suffix.model';
import { GRNLotMySuffixService } from '../service/grn-lot-my-suffix.service';

import { GRNLotMySuffixRoutingResolveService } from './grn-lot-my-suffix-routing-resolve.service';

describe('GRNLotMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: GRNLotMySuffixRoutingResolveService;
  let service: GRNLotMySuffixService;
  let resultGRNLotMySuffix: IGRNLotMySuffix | undefined;

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
    routingResolveService = TestBed.inject(GRNLotMySuffixRoutingResolveService);
    service = TestBed.inject(GRNLotMySuffixService);
    resultGRNLotMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IGRNLotMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGRNLotMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultGRNLotMySuffix).toEqual({ id: 123 });
    });

    it('should return new IGRNLotMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGRNLotMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultGRNLotMySuffix).toEqual(new GRNLotMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as GRNLotMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultGRNLotMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultGRNLotMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
