import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IGRNLotMySuffix, GRNLotMySuffix } from '../grn-lot-my-suffix.model';

import { GRNLotMySuffixService } from './grn-lot-my-suffix.service';

describe('GRNLotMySuffix Service', () => {
  let service: GRNLotMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IGRNLotMySuffix;
  let expectedResult: IGRNLotMySuffix | IGRNLotMySuffix[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GRNLotMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      grnCode: 'AAAAAAA',
      collectionDate: currentDate,
      vehicleNumber: 'AAAAAAA',
      srcOfMaterials: 'AAAAAAA',
      totalWeight: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          collectionDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a GRNLotMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          collectionDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          collectionDate: currentDate,
        },
        returnedFromService
      );

      service.create(new GRNLotMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GRNLotMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          grnCode: 'BBBBBB',
          collectionDate: currentDate.format(DATE_TIME_FORMAT),
          vehicleNumber: 'BBBBBB',
          srcOfMaterials: 'BBBBBB',
          totalWeight: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          collectionDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GRNLotMySuffix', () => {
      const patchObject = Object.assign(
        {
          srcOfMaterials: 'BBBBBB',
        },
        new GRNLotMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          collectionDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GRNLotMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          grnCode: 'BBBBBB',
          collectionDate: currentDate.format(DATE_TIME_FORMAT),
          vehicleNumber: 'BBBBBB',
          srcOfMaterials: 'BBBBBB',
          totalWeight: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          collectionDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a GRNLotMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addGRNLotMySuffixToCollectionIfMissing', () => {
      it('should add a GRNLotMySuffix to an empty array', () => {
        const gRNLot: IGRNLotMySuffix = { id: 123 };
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing([], gRNLot);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gRNLot);
      });

      it('should not add a GRNLotMySuffix to an array that contains it', () => {
        const gRNLot: IGRNLotMySuffix = { id: 123 };
        const gRNLotCollection: IGRNLotMySuffix[] = [
          {
            ...gRNLot,
          },
          { id: 456 },
        ];
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing(gRNLotCollection, gRNLot);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GRNLotMySuffix to an array that doesn't contain it", () => {
        const gRNLot: IGRNLotMySuffix = { id: 123 };
        const gRNLotCollection: IGRNLotMySuffix[] = [{ id: 456 }];
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing(gRNLotCollection, gRNLot);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gRNLot);
      });

      it('should add only unique GRNLotMySuffix to an array', () => {
        const gRNLotArray: IGRNLotMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 88682 }];
        const gRNLotCollection: IGRNLotMySuffix[] = [{ id: 123 }];
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing(gRNLotCollection, ...gRNLotArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const gRNLot: IGRNLotMySuffix = { id: 123 };
        const gRNLot2: IGRNLotMySuffix = { id: 456 };
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing([], gRNLot, gRNLot2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gRNLot);
        expect(expectedResult).toContain(gRNLot2);
      });

      it('should accept null and undefined values', () => {
        const gRNLot: IGRNLotMySuffix = { id: 123 };
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing([], null, gRNLot, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gRNLot);
      });

      it('should return initial array if no GRNLotMySuffix is added', () => {
        const gRNLotCollection: IGRNLotMySuffix[] = [{ id: 123 }];
        expectedResult = service.addGRNLotMySuffixToCollectionIfMissing(gRNLotCollection, undefined, null);
        expect(expectedResult).toEqual(gRNLotCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
