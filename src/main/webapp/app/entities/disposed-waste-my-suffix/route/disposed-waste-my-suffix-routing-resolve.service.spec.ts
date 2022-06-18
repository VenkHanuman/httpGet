import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDisposedWasteMySuffix, DisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';
import { DisposedWasteMySuffixService } from '../service/disposed-waste-my-suffix.service';

import { DisposedWasteMySuffixRoutingResolveService } from './disposed-waste-my-suffix-routing-resolve.service';

describe('DisposedWasteMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DisposedWasteMySuffixRoutingResolveService;
  let service: DisposedWasteMySuffixService;
  let resultDisposedWasteMySuffix: IDisposedWasteMySuffix | undefined;

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
    routingResolveService = TestBed.inject(DisposedWasteMySuffixRoutingResolveService);
    service = TestBed.inject(DisposedWasteMySuffixService);
    resultDisposedWasteMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IDisposedWasteMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisposedWasteMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDisposedWasteMySuffix).toEqual({ id: 123 });
    });

    it('should return new IDisposedWasteMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisposedWasteMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDisposedWasteMySuffix).toEqual(new DisposedWasteMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DisposedWasteMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisposedWasteMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDisposedWasteMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
