import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMaterialMySuffix, getMaterialMySuffixIdentifier } from '../material-my-suffix.model';

export type EntityResponseType = HttpResponse<IMaterialMySuffix>;
export type EntityArrayResponseType = HttpResponse<IMaterialMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MaterialMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/materials');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(material: IMaterialMySuffix): Observable<EntityResponseType> {
    return this.http.post<IMaterialMySuffix>(this.resourceUrl, material, { observe: 'response' });
  }

  update(material: IMaterialMySuffix): Observable<EntityResponseType> {
    return this.http.put<IMaterialMySuffix>(`${this.resourceUrl}/${getMaterialMySuffixIdentifier(material) as number}`, material, {
      observe: 'response',
    });
  }

  partialUpdate(material: IMaterialMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IMaterialMySuffix>(`${this.resourceUrl}/${getMaterialMySuffixIdentifier(material) as number}`, material, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMaterialMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMaterialMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMaterialMySuffixToCollectionIfMissing(
    materialCollection: IMaterialMySuffix[],
    ...materialsToCheck: (IMaterialMySuffix | null | undefined)[]
  ): IMaterialMySuffix[] {
    const materials: IMaterialMySuffix[] = materialsToCheck.filter(isPresent);
    if (materials.length > 0) {
      const materialCollectionIdentifiers = materialCollection.map(materialItem => getMaterialMySuffixIdentifier(materialItem)!);
      const materialsToAdd = materials.filter(materialItem => {
        const materialIdentifier = getMaterialMySuffixIdentifier(materialItem);
        if (materialIdentifier == null || materialCollectionIdentifiers.includes(materialIdentifier)) {
          return false;
        }
        materialCollectionIdentifiers.push(materialIdentifier);
        return true;
      });
      return [...materialsToAdd, ...materialCollection];
    }
    return materialCollection;
  }
}
