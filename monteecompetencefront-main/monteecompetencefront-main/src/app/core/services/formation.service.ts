import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FormationModel } from '../../shared/models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl = environment.formationUrl;

  constructor(private apiService: ApiService) { }

  getFormations(): Observable<FormationModel[]> {
    return this.apiService.get<FormationModel[]>(this.formationUrl);
  }

  getOneFormation(id: number): Observable<FormationModel> {
    return this.apiService.get<FormationModel>(`${this.formationUrl}/${id}`);
  }

  addFormation(formation: FormationModel): Observable<FormationModel> {
    return this.apiService.post<FormationModel>(this.formationUrl, formation);
  }

  updateFormation(formation: FormationModel): Observable<FormationModel> {
    return this.apiService.put<FormationModel>(`${this.formationUrl}/${formation.id}`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.formationUrl}/${id}`);
  }

}
