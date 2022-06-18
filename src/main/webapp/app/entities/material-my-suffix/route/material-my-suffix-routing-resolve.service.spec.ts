import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMaterialMySuffix, MaterialMySuffix } from '../material-my-suffix.model';
import { MaterialMySuffixService } from '../service/material-my-suffix.service';

import { MaterialMySuffixRoutingResolveService } from './material-my-suffix-routing-resolve.service';

describe('MaterialMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MaterialMySuffixRoutingResolveService;
  let service: MaterialMySuffixService;
  let resultMaterialMySuffix: IMaterialMySuffix | undefined;

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
    routingResolveService = TestBed.inject(MaterialMySuffixRoutingResolveService);
    service = TestBed.inject(MaterialMySuffixService);
    resultMaterialMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IMaterialMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialMySuffix).toEqual({ id: 123 });
    });

    it('should return new IMaterialMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMaterialMySuffix).toEqual(new MaterialMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MaterialMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
