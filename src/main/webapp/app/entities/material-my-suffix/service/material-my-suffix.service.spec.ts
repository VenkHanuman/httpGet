import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MaterialType } from 'app/entities/enumerations/material-type.model';
import { IMaterialMySuffix, MaterialMySuffix } from '../material-my-suffix.model';

import { MaterialMySuffixService } from './material-my-suffix.service';

describe('MaterialMySuffix Service', () => {
  let service: MaterialMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IMaterialMySuffix;
  let expectedResult: IMaterialMySuffix | IMaterialMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MaterialMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      typeOfMaterial: MaterialType.PS,
      subTotalWeight: 0,
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

    it('should create a MaterialMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new MaterialMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MaterialMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          typeOfMaterial: 'BBBBBB',
          subTotalWeight: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MaterialMySuffix', () => {
      const patchObject = Object.assign(
        {
          typeOfMaterial: 'BBBBBB',
          subTotalWeight: 1,
        },
        new MaterialMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MaterialMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          typeOfMaterial: 'BBBBBB',
          subTotalWeight: 1,
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

    it('should delete a MaterialMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMaterialMySuffixToCollectionIfMissing', () => {
      it('should add a MaterialMySuffix to an empty array', () => {
        const material: IMaterialMySuffix = { id: 123 };
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing([], material);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(material);
      });

      it('should not add a MaterialMySuffix to an array that contains it', () => {
        const material: IMaterialMySuffix = { id: 123 };
        const materialCollection: IMaterialMySuffix[] = [
          {
            ...material,
          },
          { id: 456 },
        ];
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing(materialCollection, material);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MaterialMySuffix to an array that doesn't contain it", () => {
        const material: IMaterialMySuffix = { id: 123 };
        const materialCollection: IMaterialMySuffix[] = [{ id: 456 }];
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing(materialCollection, material);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(material);
      });

      it('should add only unique MaterialMySuffix to an array', () => {
        const materialArray: IMaterialMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 66754 }];
        const materialCollection: IMaterialMySuffix[] = [{ id: 123 }];
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing(materialCollection, ...materialArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const material: IMaterialMySuffix = { id: 123 };
        const material2: IMaterialMySuffix = { id: 456 };
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing([], material, material2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(material);
        expect(expectedResult).toContain(material2);
      });

      it('should accept null and undefined values', () => {
        const material: IMaterialMySuffix = { id: 123 };
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing([], null, material, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(material);
      });

      it('should return initial array if no MaterialMySuffix is added', () => {
        const materialCollection: IMaterialMySuffix[] = [{ id: 123 }];
        expectedResult = service.addMaterialMySuffixToCollectionIfMissing(materialCollection, undefined, null);
        expect(expectedResult).toEqual(materialCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
