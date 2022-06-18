import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IOutputBundleMySuffix, OutputBundleMySuffix } from '../output-bundle-my-suffix.model';
import { OutputBundleMySuffixService } from '../service/output-bundle-my-suffix.service';

import { OutputBundleMySuffixRoutingResolveService } from './output-bundle-my-suffix-routing-resolve.service';

describe('OutputBundleMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: OutputBundleMySuffixRoutingResolveService;
  let service: OutputBundleMySuffixService;
  let resultOutputBundleMySuffix: IOutputBundleMySuffix | undefined;

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
    routingResolveService = TestBed.inject(OutputBundleMySuffixRoutingResolveService);
    service = TestBed.inject(OutputBundleMySuffixService);
    resultOutputBundleMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IOutputBundleMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOutputBundleMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOutputBundleMySuffix).toEqual({ id: 123 });
    });

    it('should return new IOutputBundleMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOutputBundleMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultOutputBundleMySuffix).toEqual(new OutputBundleMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as OutputBundleMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultOutputBundleMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultOutputBundleMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
