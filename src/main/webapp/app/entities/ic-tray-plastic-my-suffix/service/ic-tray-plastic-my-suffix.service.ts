import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IICTrayPlasticMySuffix, getICTrayPlasticMySuffixIdentifier } from '../ic-tray-plastic-my-suffix.model';

export type EntityResponseType = HttpResponse<IICTrayPlasticMySuffix>;
export type EntityArrayResponseType = HttpResponse<IICTrayPlasticMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ICTrayPlasticMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ic-tray-plastics');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(iCTrayPlastic: IICTrayPlasticMySuffix): Observable<EntityResponseType> {
    return this.http.post<IICTrayPlasticMySuffix>(this.resourceUrl, iCTrayPlastic, { observe: 'response' });
  }

  update(iCTrayPlastic: IICTrayPlasticMySuffix): Observable<EntityResponseType> {
    return this.http.put<IICTrayPlasticMySuffix>(
      `${this.resourceUrl}/${getICTrayPlasticMySuffixIdentifier(iCTrayPlastic) as number}`,
      iCTrayPlastic,
      { observe: 'response' }
    );
  }

  partialUpdate(iCTrayPlastic: IICTrayPlasticMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IICTrayPlasticMySuffix>(
      `${this.resourceUrl}/${getICTrayPlasticMySuffixIdentifier(iCTrayPlastic) as number}`,
      iCTrayPlastic,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IICTrayPlasticMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IICTrayPlasticMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addICTrayPlasticMySuffixToCollectionIfMissing(
    iCTrayPlasticCollection: IICTrayPlasticMySuffix[],
    ...iCTrayPlasticsToCheck: (IICTrayPlasticMySuffix | null | undefined)[]
  ): IICTrayPlasticMySuffix[] {
    const iCTrayPlastics: IICTrayPlasticMySuffix[] = iCTrayPlasticsToCheck.filter(isPresent);
    if (iCTrayPlastics.length > 0) {
      const iCTrayPlasticCollectionIdentifiers = iCTrayPlasticCollection.map(
        iCTrayPlasticItem => getICTrayPlasticMySuffixIdentifier(iCTrayPlasticItem)!
      );
      const iCTrayPlasticsToAdd = iCTrayPlastics.filter(iCTrayPlasticItem => {
        const iCTrayPlasticIdentifier = getICTrayPlasticMySuffixIdentifier(iCTrayPlasticItem);
        if (iCTrayPlasticIdentifier == null || iCTrayPlasticCollectionIdentifiers.includes(iCTrayPlasticIdentifier)) {
          return false;
        }
        iCTrayPlasticCollectionIdentifiers.push(iCTrayPlasticIdentifier);
        return true;
      });
      return [...iCTrayPlasticsToAdd, ...iCTrayPlasticCollection];
    }
    return iCTrayPlasticCollection;
  }
}
