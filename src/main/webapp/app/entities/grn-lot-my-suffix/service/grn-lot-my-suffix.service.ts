import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGRNLotMySuffix, getGRNLotMySuffixIdentifier } from '../grn-lot-my-suffix.model';

export type EntityResponseType = HttpResponse<IGRNLotMySuffix>;
export type EntityArrayResponseType = HttpResponse<IGRNLotMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class GRNLotMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grn-lots');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(gRNLot: IGRNLotMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gRNLot);
    return this.http
      .post<IGRNLotMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gRNLot: IGRNLotMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gRNLot);
    return this.http
      .put<IGRNLotMySuffix>(`${this.resourceUrl}/${getGRNLotMySuffixIdentifier(gRNLot) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(gRNLot: IGRNLotMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gRNLot);
    return this.http
      .patch<IGRNLotMySuffix>(`${this.resourceUrl}/${getGRNLotMySuffixIdentifier(gRNLot) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGRNLotMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGRNLotMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addGRNLotMySuffixToCollectionIfMissing(
    gRNLotCollection: IGRNLotMySuffix[],
    ...gRNLotsToCheck: (IGRNLotMySuffix | null | undefined)[]
  ): IGRNLotMySuffix[] {
    const gRNLots: IGRNLotMySuffix[] = gRNLotsToCheck.filter(isPresent);
    if (gRNLots.length > 0) {
      const gRNLotCollectionIdentifiers = gRNLotCollection.map(gRNLotItem => getGRNLotMySuffixIdentifier(gRNLotItem)!);
      const gRNLotsToAdd = gRNLots.filter(gRNLotItem => {
        const gRNLotIdentifier = getGRNLotMySuffixIdentifier(gRNLotItem);
        if (gRNLotIdentifier == null || gRNLotCollectionIdentifiers.includes(gRNLotIdentifier)) {
          return false;
        }
        gRNLotCollectionIdentifiers.push(gRNLotIdentifier);
        return true;
      });
      return [...gRNLotsToAdd, ...gRNLotCollection];
    }
    return gRNLotCollection;
  }

  protected convertDateFromClient(gRNLot: IGRNLotMySuffix): IGRNLotMySuffix {
    return Object.assign({}, gRNLot, {
      collectionDate: gRNLot.collectionDate?.isValid() ? gRNLot.collectionDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.collectionDate = res.body.collectionDate ? dayjs(res.body.collectionDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((gRNLot: IGRNLotMySuffix) => {
        gRNLot.collectionDate = gRNLot.collectionDate ? dayjs(gRNLot.collectionDate) : undefined;
      });
    }
    return res;
  }
}
