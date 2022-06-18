import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOutputBundleMySuffix, OutputBundleMySuffix } from '../output-bundle-my-suffix.model';

import { OutputBundleMySuffixService } from './output-bundle-my-suffix.service';

describe('OutputBundleMySuffix Service', () => {
  let service: OutputBundleMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IOutputBundleMySuffix;
  let expectedResult: IOutputBundleMySuffix | IOutputBundleMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OutputBundleMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      total: 0,
      totalOfDisposableWaste: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a OutputBundleMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new OutputBundleMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OutputBundleMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          total: 1,
          totalOfDisposableWaste: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OutputBundleMySuffix', () => {
      const patchObject = Object.assign(
        {
          total: 1,
          totalOfDisposableWaste: 1,
        },
        new OutputBundleMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OutputBundleMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          total: 1,
          totalOfDisposableWaste: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a OutputBundleMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addOutputBundleMySuffixToCollectionIfMissing', () => {
      it('should add a OutputBundleMySuffix to an empty array', () => {
        const outputBundle: IOutputBundleMySuffix = { id: 123 };
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing([], outputBundle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outputBundle);
      });

      it('should not add a OutputBundleMySuffix to an array that contains it', () => {
        const outputBundle: IOutputBundleMySuffix = { id: 123 };
        const outputBundleCollection: IOutputBundleMySuffix[] = [
          {
            ...outputBundle,
          },
          { id: 456 },
        ];
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing(outputBundleCollection, outputBundle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OutputBundleMySuffix to an array that doesn't contain it", () => {
        const outputBundle: IOutputBundleMySuffix = { id: 123 };
        const outputBundleCollection: IOutputBundleMySuffix[] = [{ id: 456 }];
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing(outputBundleCollection, outputBundle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outputBundle);
      });

      it('should add only unique OutputBundleMySuffix to an array', () => {
        const outputBundleArray: IOutputBundleMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 67730 }];
        const outputBundleCollection: IOutputBundleMySuffix[] = [{ id: 123 }];
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing(outputBundleCollection, ...outputBundleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const outputBundle: IOutputBundleMySuffix = { id: 123 };
        const outputBundle2: IOutputBundleMySuffix = { id: 456 };
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing([], outputBundle, outputBundle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(outputBundle);
        expect(expectedResult).toContain(outputBundle2);
      });

      it('should accept null and undefined values', () => {
        const outputBundle: IOutputBundleMySuffix = { id: 123 };
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing([], null, outputBundle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(outputBundle);
      });

      it('should return initial array if no OutputBundleMySuffix is added', () => {
        const outputBundleCollection: IOutputBundleMySuffix[] = [{ id: 123 }];
        expectedResult = service.addOutputBundleMySuffixToCollectionIfMissing(outputBundleCollection, undefined, null);
        expect(expectedResult).toEqual(outputBundleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
