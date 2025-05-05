import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { InformationModel } from '../../shared/models/information.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private informationUrl = environment.informationUrl
  constructor(private apiService : ApiService){}
  addInformation(information : InformationModel) : Observable<InformationModel>{
    return this.apiService.post<InformationModel>(this.informationUrl,information)
  }
  getInformations() : Observable<InformationModel[]>{
    return this.apiService.get<InformationModel[]>(this.informationUrl)
  }
  getOneInformation(id : number) : Observable<InformationModel>{
    return this.apiService.get<InformationModel>(`${this.informationUrl}/${id}`)
  }
  updateInformation(information : InformationModel) : Observable<InformationModel>{
    return this.apiService.put<InformationModel>(`${this.informationUrl}/${information.id}`,information)
  }
  deleteInformation(id : number) : Observable<void>{
    return this.apiService.delete<void>(`${this.informationUrl}/${id}`)
  }
}
