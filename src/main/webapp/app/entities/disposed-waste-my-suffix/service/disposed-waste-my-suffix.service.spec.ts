import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDisposedWasteMySuffix, DisposedWasteMySuffix } from '../disposed-waste-my-suffix.model';

import { DisposedWasteMySuffixService } from './disposed-waste-my-suffix.service';

describe('DisposedWasteMySuffix Service', () => {
  let service: DisposedWasteMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IDisposedWasteMySuffix;
  let expectedResult: IDisposedWasteMySuffix | IDisposedWasteMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisposedWasteMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
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

    it('should create a DisposedWasteMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DisposedWasteMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DisposedWasteMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should partial update a DisposedWasteMySuffix', () => {
      const patchObject = Object.assign({}, new DisposedWasteMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DisposedWasteMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should delete a DisposedWasteMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDisposedWasteMySuffixToCollectionIfMissing', () => {
      it('should add a DisposedWasteMySuffix to an empty array', () => {
        const disposedWaste: IDisposedWasteMySuffix = { id: 123 };
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing([], disposedWaste);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disposedWaste);
      });

      it('should not add a DisposedWasteMySuffix to an array that contains it', () => {
        const disposedWaste: IDisposedWasteMySuffix = { id: 123 };
        const disposedWasteCollection: IDisposedWasteMySuffix[] = [
          {
            ...disposedWaste,
          },
          { id: 456 },
        ];
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing(disposedWasteCollection, disposedWaste);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DisposedWasteMySuffix to an array that doesn't contain it", () => {
        const disposedWaste: IDisposedWasteMySuffix = { id: 123 };
        const disposedWasteCollection: IDisposedWasteMySuffix[] = [{ id: 456 }];
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing(disposedWasteCollection, disposedWaste);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disposedWaste);
      });

      it('should add only unique DisposedWasteMySuffix to an array', () => {
        const disposedWasteArray: IDisposedWasteMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 67960 }];
        const disposedWasteCollection: IDisposedWasteMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing(disposedWasteCollection, ...disposedWasteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disposedWaste: IDisposedWasteMySuffix = { id: 123 };
        const disposedWaste2: IDisposedWasteMySuffix = { id: 456 };
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing([], disposedWaste, disposedWaste2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disposedWaste);
        expect(expectedResult).toContain(disposedWaste2);
      });

      it('should accept null and undefined values', () => {
        const disposedWaste: IDisposedWasteMySuffix = { id: 123 };
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing([], null, disposedWaste, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disposedWaste);
      });

      it('should return initial array if no DisposedWasteMySuffix is added', () => {
        const disposedWasteCollection: IDisposedWasteMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDisposedWasteMySuffixToCollectionIfMissing(disposedWasteCollection, undefined, null);
        expect(expectedResult).toEqual(disposedWasteCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
