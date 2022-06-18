import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisposedWasteMySuffix, getDisposedWasteMySuffixIdentifier } from '../disposed-waste-my-suffix.model';

export type EntityResponseType = HttpResponse<IDisposedWasteMySuffix>;
export type EntityArrayResponseType = HttpResponse<IDisposedWasteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DisposedWasteMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disposed-wastes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disposedWaste: IDisposedWasteMySuffix): Observable<EntityResponseType> {
    return this.http.post<IDisposedWasteMySuffix>(this.resourceUrl, disposedWaste, { observe: 'response' });
  }

  update(disposedWaste: IDisposedWasteMySuffix): Observable<EntityResponseType> {
    return this.http.put<IDisposedWasteMySuffix>(
      `${this.resourceUrl}/${getDisposedWasteMySuffixIdentifier(disposedWaste) as number}`,
      disposedWaste,
      { observe: 'response' }
    );
  }

  partialUpdate(disposedWaste: IDisposedWasteMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IDisposedWasteMySuffix>(
      `${this.resourceUrl}/${getDisposedWasteMySuffixIdentifier(disposedWaste) as number}`,
      disposedWaste,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDisposedWasteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisposedWasteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDisposedWasteMySuffixToCollectionIfMissing(
    disposedWasteCollection: IDisposedWasteMySuffix[],
    ...disposedWastesToCheck: (IDisposedWasteMySuffix | null | undefined)[]
  ): IDisposedWasteMySuffix[] {
    const disposedWastes: IDisposedWasteMySuffix[] = disposedWastesToCheck.filter(isPresent);
    if (disposedWastes.length > 0) {
      const disposedWasteCollectionIdentifiers = disposedWasteCollection.map(
        disposedWasteItem => getDisposedWasteMySuffixIdentifier(disposedWasteItem)!
      );
      const disposedWastesToAdd = disposedWastes.filter(disposedWasteItem => {
        const disposedWasteIdentifier = getDisposedWasteMySuffixIdentifier(disposedWasteItem);
        if (disposedWasteIdentifier == null || disposedWasteCollectionIdentifiers.includes(disposedWasteIdentifier)) {
          return false;
        }
        disposedWasteCollectionIdentifiers.push(disposedWasteIdentifier);
        return true;
      });
      return [...disposedWastesToAdd, ...disposedWasteCollection];
    }
    return disposedWasteCollection;
  }
}
