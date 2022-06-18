import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MaterialType } from 'app/entities/enumerations/material-type.model';
import { IMaterialOutputMySuffix, MaterialOutputMySuffix } from '../material-output-my-suffix.model';

import { MaterialOutputMySuffixService } from './material-output-my-suffix.service';

describe('MaterialOutputMySuffix Service', () => {
  let service: MaterialOutputMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IMaterialOutputMySuffix;
  let expectedResult: IMaterialOutputMySuffix | IMaterialOutputMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MaterialOutputMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      typeOfMatrial: MaterialType.PS,
      subTotal: 0,
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

    it('should create a MaterialOutputMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new MaterialOutputMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MaterialOutputMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          typeOfMatrial: 'BBBBBB',
          subTotal: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MaterialOutputMySuffix', () => {
      const patchObject = Object.assign(
        {
          typeOfMatrial: 'BBBBBB',
          subTotal: 1,
        },
        new MaterialOutputMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MaterialOutputMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          typeOfMatrial: 'BBBBBB',
          subTotal: 1,
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

    it('should delete a MaterialOutputMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMaterialOutputMySuffixToCollectionIfMissing', () => {
      it('should add a MaterialOutputMySuffix to an empty array', () => {
        const materialOutput: IMaterialOutputMySuffix = { id: 123 };
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing([], materialOutput);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialOutput);
      });

      it('should not add a MaterialOutputMySuffix to an array that contains it', () => {
        const materialOutput: IMaterialOutputMySuffix = { id: 123 };
        const materialOutputCollection: IMaterialOutputMySuffix[] = [
          {
            ...materialOutput,
          },
          { id: 456 },
        ];
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing(materialOutputCollection, materialOutput);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MaterialOutputMySuffix to an array that doesn't contain it", () => {
        const materialOutput: IMaterialOutputMySuffix = { id: 123 };
        const materialOutputCollection: IMaterialOutputMySuffix[] = [{ id: 456 }];
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing(materialOutputCollection, materialOutput);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialOutput);
      });

      it('should add only unique MaterialOutputMySuffix to an array', () => {
        const materialOutputArray: IMaterialOutputMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 82818 }];
        const materialOutputCollection: IMaterialOutputMySuffix[] = [{ id: 123 }];
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing(materialOutputCollection, ...materialOutputArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const materialOutput: IMaterialOutputMySuffix = { id: 123 };
        const materialOutput2: IMaterialOutputMySuffix = { id: 456 };
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing([], materialOutput, materialOutput2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(materialOutput);
        expect(expectedResult).toContain(materialOutput2);
      });

      it('should accept null and undefined values', () => {
        const materialOutput: IMaterialOutputMySuffix = { id: 123 };
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing([], null, materialOutput, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(materialOutput);
      });

      it('should return initial array if no MaterialOutputMySuffix is added', () => {
        const materialOutputCollection: IMaterialOutputMySuffix[] = [{ id: 123 }];
        expectedResult = service.addMaterialOutputMySuffixToCollectionIfMissing(materialOutputCollection, undefined, null);
        expect(expectedResult).toEqual(materialOutputCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
