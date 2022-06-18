import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaterialOutputMySuffix, getMaterialOutputMySuffixIdentifier } from '../material-output-my-suffix.model';

export type EntityResponseType = HttpResponse<IMaterialOutputMySuffix>;
export type EntityArrayResponseType = HttpResponse<IMaterialOutputMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MaterialOutputMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/material-outputs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(materialOutput: IMaterialOutputMySuffix): Observable<EntityResponseType> {
    return this.http.post<IMaterialOutputMySuffix>(this.resourceUrl, materialOutput, { observe: 'response' });
  }

  update(materialOutput: IMaterialOutputMySuffix): Observable<EntityResponseType> {
    return this.http.put<IMaterialOutputMySuffix>(
      `${this.resourceUrl}/${getMaterialOutputMySuffixIdentifier(materialOutput) as number}`,
      materialOutput,
      { observe: 'response' }
    );
  }

  partialUpdate(materialOutput: IMaterialOutputMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IMaterialOutputMySuffix>(
      `${this.resourceUrl}/${getMaterialOutputMySuffixIdentifier(materialOutput) as number}`,
      materialOutput,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterialOutputMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterialOutputMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMaterialOutputMySuffixToCollectionIfMissing(
    materialOutputCollection: IMaterialOutputMySuffix[],
    ...materialOutputsToCheck: (IMaterialOutputMySuffix | null | undefined)[]
  ): IMaterialOutputMySuffix[] {
    const materialOutputs: IMaterialOutputMySuffix[] = materialOutputsToCheck.filter(isPresent);
    if (materialOutputs.length > 0) {
      const materialOutputCollectionIdentifiers = materialOutputCollection.map(
        materialOutputItem => getMaterialOutputMySuffixIdentifier(materialOutputItem)!
      );
      const materialOutputsToAdd = materialOutputs.filter(materialOutputItem => {
        const materialOutputIdentifier = getMaterialOutputMySuffixIdentifier(materialOutputItem);
        if (materialOutputIdentifier == null || materialOutputCollectionIdentifiers.includes(materialOutputIdentifier)) {
          return false;
        }
        materialOutputCollectionIdentifiers.push(materialOutputIdentifier);
        return true;
      });
      return [...materialOutputsToAdd, ...materialOutputCollection];
    }
    return materialOutputCollection;
  }
}
