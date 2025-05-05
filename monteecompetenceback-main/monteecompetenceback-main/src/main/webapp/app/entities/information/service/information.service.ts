import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInformation, NewInformation } from '../information.model';

export type PartialUpdateInformation = Partial<IInformation> & Pick<IInformation, 'id'>;

export type EntityResponseType = HttpResponse<IInformation>;
export type EntityArrayResponseType = HttpResponse<IInformation[]>;

@Injectable({ providedIn: 'root' })
export class InformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/information');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(information: NewInformation): Observable<EntityResponseType> {
    return this.http.post<IInformation>(this.resourceUrl, information, { observe: 'response' });
  }

  update(information: IInformation): Observable<EntityResponseType> {
    return this.http.put<IInformation>(`${this.resourceUrl}/${this.getInformationIdentifier(information)}`, information, {
      observe: 'response',
    });
  }

  partialUpdate(information: PartialUpdateInformation): Observable<EntityResponseType> {
    return this.http.patch<IInformation>(`${this.resourceUrl}/${this.getInformationIdentifier(information)}`, information, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInformationIdentifier(information: Pick<IInformation, 'id'>): number {
    return information.id;
  }

  compareInformation(o1: Pick<IInformation, 'id'> | null, o2: Pick<IInformation, 'id'> | null): boolean {
    return o1 && o2 ? this.getInformationIdentifier(o1) === this.getInformationIdentifier(o2) : o1 === o2;
  }

  addInformationToCollectionIfMissing<Type extends Pick<IInformation, 'id'>>(
    informationCollection: Type[],
    ...informationToCheck: (Type | null | undefined)[]
  ): Type[] {
    const information: Type[] = informationToCheck.filter(isPresent);
    if (information.length > 0) {
      const informationCollectionIdentifiers = informationCollection.map(
        informationItem => this.getInformationIdentifier(informationItem)!,
      );
      const informationToAdd = information.filter(informationItem => {
        const informationIdentifier = this.getInformationIdentifier(informationItem);
        if (informationCollectionIdentifiers.includes(informationIdentifier)) {
          return false;
        }
        informationCollectionIdentifiers.push(informationIdentifier);
        return true;
      });
      return [...informationToAdd, ...informationCollection];
    }
    return informationCollection;
  }
}
