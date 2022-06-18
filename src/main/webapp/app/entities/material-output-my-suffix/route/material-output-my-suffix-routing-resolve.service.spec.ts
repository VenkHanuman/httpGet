import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMaterialOutputMySuffix, MaterialOutputMySuffix } from '../material-output-my-suffix.model';
import { MaterialOutputMySuffixService } from '../service/material-output-my-suffix.service';

import { MaterialOutputMySuffixRoutingResolveService } from './material-output-my-suffix-routing-resolve.service';

describe('MaterialOutputMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MaterialOutputMySuffixRoutingResolveService;
  let service: MaterialOutputMySuffixService;
  let resultMaterialOutputMySuffix: IMaterialOutputMySuffix | undefined;

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
    routingResolveService = TestBed.inject(MaterialOutputMySuffixRoutingResolveService);
    service = TestBed.inject(MaterialOutputMySuffixService);
    resultMaterialOutputMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IMaterialOutputMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialOutputMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialOutputMySuffix).toEqual({ id: 123 });
    });

    it('should return new IMaterialOutputMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialOutputMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMaterialOutputMySuffix).toEqual(new MaterialOutputMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MaterialOutputMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialOutputMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialOutputMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
