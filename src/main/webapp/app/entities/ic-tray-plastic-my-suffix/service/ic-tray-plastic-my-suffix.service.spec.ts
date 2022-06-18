import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IICTrayPlasticMySuffix, ICTrayPlasticMySuffix } from '../ic-tray-plastic-my-suffix.model';

import { ICTrayPlasticMySuffixService } from './ic-tray-plastic-my-suffix.service';

describe('ICTrayPlasticMySuffix Service', () => {
  let service: ICTrayPlasticMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IICTrayPlasticMySuffix;
  let expectedResult: IICTrayPlasticMySuffix | IICTrayPlasticMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ICTrayPlasticMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      brandName: 'AAAAAAA',
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

    it('should create a ICTrayPlasticMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ICTrayPlasticMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ICTrayPlasticMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          brandName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ICTrayPlasticMySuffix', () => {
      const patchObject = Object.assign({}, new ICTrayPlasticMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ICTrayPlasticMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          brandName: 'BBBBBB',
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

    it('should delete a ICTrayPlasticMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addICTrayPlasticMySuffixToCollectionIfMissing', () => {
      it('should add a ICTrayPlasticMySuffix to an empty array', () => {
        const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 123 };
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing([], iCTrayPlastic);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(iCTrayPlastic);
      });

      it('should not add a ICTrayPlasticMySuffix to an array that contains it', () => {
        const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 123 };
        const iCTrayPlasticCollection: IICTrayPlasticMySuffix[] = [
          {
            ...iCTrayPlastic,
          },
          { id: 456 },
        ];
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing(iCTrayPlasticCollection, iCTrayPlastic);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ICTrayPlasticMySuffix to an array that doesn't contain it", () => {
        const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 123 };
        const iCTrayPlasticCollection: IICTrayPlasticMySuffix[] = [{ id: 456 }];
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing(iCTrayPlasticCollection, iCTrayPlastic);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(iCTrayPlastic);
      });

      it('should add only unique ICTrayPlasticMySuffix to an array', () => {
        const iCTrayPlasticArray: IICTrayPlasticMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 79120 }];
        const iCTrayPlasticCollection: IICTrayPlasticMySuffix[] = [{ id: 123 }];
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing(iCTrayPlasticCollection, ...iCTrayPlasticArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 123 };
        const iCTrayPlastic2: IICTrayPlasticMySuffix = { id: 456 };
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing([], iCTrayPlastic, iCTrayPlastic2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(iCTrayPlastic);
        expect(expectedResult).toContain(iCTrayPlastic2);
      });

      it('should accept null and undefined values', () => {
        const iCTrayPlastic: IICTrayPlasticMySuffix = { id: 123 };
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing([], null, iCTrayPlastic, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(iCTrayPlastic);
      });

      it('should return initial array if no ICTrayPlasticMySuffix is added', () => {
        const iCTrayPlasticCollection: IICTrayPlasticMySuffix[] = [{ id: 123 }];
        expectedResult = service.addICTrayPlasticMySuffixToCollectionIfMissing(iCTrayPlasticCollection, undefined, null);
        expect(expectedResult).toEqual(iCTrayPlasticCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
