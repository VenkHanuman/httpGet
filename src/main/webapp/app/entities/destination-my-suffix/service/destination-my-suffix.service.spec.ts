import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDestinationMySuffix, DestinationMySuffix } from '../destination-my-suffix.model';

import { DestinationMySuffixService } from './destination-my-suffix.service';

describe('DestinationMySuffix Service', () => {
  let service: DestinationMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IDestinationMySuffix;
  let expectedResult: IDestinationMySuffix | IDestinationMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DestinationMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
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

    it('should create a DestinationMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DestinationMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DestinationMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DestinationMySuffix', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new DestinationMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DestinationMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
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

    it('should delete a DestinationMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDestinationMySuffixToCollectionIfMissing', () => {
      it('should add a DestinationMySuffix to an empty array', () => {
        const destination: IDestinationMySuffix = { id: 123 };
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing([], destination);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(destination);
      });

      it('should not add a DestinationMySuffix to an array that contains it', () => {
        const destination: IDestinationMySuffix = { id: 123 };
        const destinationCollection: IDestinationMySuffix[] = [
          {
            ...destination,
          },
          { id: 456 },
        ];
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing(destinationCollection, destination);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DestinationMySuffix to an array that doesn't contain it", () => {
        const destination: IDestinationMySuffix = { id: 123 };
        const destinationCollection: IDestinationMySuffix[] = [{ id: 456 }];
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing(destinationCollection, destination);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(destination);
      });

      it('should add only unique DestinationMySuffix to an array', () => {
        const destinationArray: IDestinationMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 2050 }];
        const destinationCollection: IDestinationMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing(destinationCollection, ...destinationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const destination: IDestinationMySuffix = { id: 123 };
        const destination2: IDestinationMySuffix = { id: 456 };
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing([], destination, destination2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(destination);
        expect(expectedResult).toContain(destination2);
      });

      it('should accept null and undefined values', () => {
        const destination: IDestinationMySuffix = { id: 123 };
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing([], null, destination, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(destination);
      });

      it('should return initial array if no DestinationMySuffix is added', () => {
        const destinationCollection: IDestinationMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDestinationMySuffixToCollectionIfMissing(destinationCollection, undefined, null);
        expect(expectedResult).toEqual(destinationCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
