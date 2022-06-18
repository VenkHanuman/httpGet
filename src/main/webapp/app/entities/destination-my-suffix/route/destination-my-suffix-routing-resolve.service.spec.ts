import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDestinationMySuffix, DestinationMySuffix } from '../destination-my-suffix.model';
import { DestinationMySuffixService } from '../service/destination-my-suffix.service';

import { DestinationMySuffixRoutingResolveService } from './destination-my-suffix-routing-resolve.service';

describe('DestinationMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DestinationMySuffixRoutingResolveService;
  let service: DestinationMySuffixService;
  let resultDestinationMySuffix: IDestinationMySuffix | undefined;

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
    routingResolveService = TestBed.inject(DestinationMySuffixRoutingResolveService);
    service = TestBed.inject(DestinationMySuffixService);
    resultDestinationMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IDestinationMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDestinationMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDestinationMySuffix).toEqual({ id: 123 });
    });

    it('should return new IDestinationMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDestinationMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDestinationMySuffix).toEqual(new DestinationMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DestinationMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDestinationMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDestinationMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
