import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDestinationMySuffix, getDestinationMySuffixIdentifier } from '../destination-my-suffix.model';

export type EntityResponseType = HttpResponse<IDestinationMySuffix>;
export type EntityArrayResponseType = HttpResponse<IDestinationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DestinationMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/destinations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(destination: IDestinationMySuffix): Observable<EntityResponseType> {
    return this.http.post<IDestinationMySuffix>(this.resourceUrl, destination, { observe: 'response' });
  }

  update(destination: IDestinationMySuffix): Observable<EntityResponseType> {
    return this.http.put<IDestinationMySuffix>(
      `${this.resourceUrl}/${getDestinationMySuffixIdentifier(destination) as number}`,
      destination,
      { observe: 'response' }
    );
  }

  partialUpdate(destination: IDestinationMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IDestinationMySuffix>(
      `${this.resourceUrl}/${getDestinationMySuffixIdentifier(destination) as number}`,
      destination,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDestinationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDestinationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDestinationMySuffixToCollectionIfMissing(
    destinationCollection: IDestinationMySuffix[],
    ...destinationsToCheck: (IDestinationMySuffix | null | undefined)[]
  ): IDestinationMySuffix[] {
    const destinations: IDestinationMySuffix[] = destinationsToCheck.filter(isPresent);
    if (destinations.length > 0) {
      const destinationCollectionIdentifiers = destinationCollection.map(
        destinationItem => getDestinationMySuffixIdentifier(destinationItem)!
      );
      const destinationsToAdd = destinations.filter(destinationItem => {
        const destinationIdentifier = getDestinationMySuffixIdentifier(destinationItem);
        if (destinationIdentifier == null || destinationCollectionIdentifiers.includes(destinationIdentifier)) {
          return false;
        }
        destinationCollectionIdentifiers.push(destinationIdentifier);
        return true;
      });
      return [...destinationsToAdd, ...destinationCollection];
    }
    return destinationCollection;
  }
}
