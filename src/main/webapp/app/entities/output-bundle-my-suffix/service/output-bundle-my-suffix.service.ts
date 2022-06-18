import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOutputBundleMySuffix, getOutputBundleMySuffixIdentifier } from '../output-bundle-my-suffix.model';

export type EntityResponseType = HttpResponse<IOutputBundleMySuffix>;
export type EntityArrayResponseType = HttpResponse<IOutputBundleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OutputBundleMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/output-bundles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(outputBundle: IOutputBundleMySuffix): Observable<EntityResponseType> {
    return this.http.post<IOutputBundleMySuffix>(this.resourceUrl, outputBundle, { observe: 'response' });
  }

  update(outputBundle: IOutputBundleMySuffix): Observable<EntityResponseType> {
    return this.http.put<IOutputBundleMySuffix>(
      `${this.resourceUrl}/${getOutputBundleMySuffixIdentifier(outputBundle) as number}`,
      outputBundle,
      { observe: 'response' }
    );
  }

  partialUpdate(outputBundle: IOutputBundleMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IOutputBundleMySuffix>(
      `${this.resourceUrl}/${getOutputBundleMySuffixIdentifier(outputBundle) as number}`,
      outputBundle,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOutputBundleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOutputBundleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addOutputBundleMySuffixToCollectionIfMissing(
    outputBundleCollection: IOutputBundleMySuffix[],
    ...outputBundlesToCheck: (IOutputBundleMySuffix | null | undefined)[]
  ): IOutputBundleMySuffix[] {
    const outputBundles: IOutputBundleMySuffix[] = outputBundlesToCheck.filter(isPresent);
    if (outputBundles.length > 0) {
      const outputBundleCollectionIdentifiers = outputBundleCollection.map(
        outputBundleItem => getOutputBundleMySuffixIdentifier(outputBundleItem)!
      );
      const outputBundlesToAdd = outputBundles.filter(outputBundleItem => {
        const outputBundleIdentifier = getOutputBundleMySuffixIdentifier(outputBundleItem);
        if (outputBundleIdentifier == null || outputBundleCollectionIdentifiers.includes(outputBundleIdentifier)) {
          return false;
        }
        outputBundleCollectionIdentifiers.push(outputBundleIdentifier);
        return true;
      });
      return [...outputBundlesToAdd, ...outputBundleCollection];
    }
    return outputBundleCollection;
  }
}
