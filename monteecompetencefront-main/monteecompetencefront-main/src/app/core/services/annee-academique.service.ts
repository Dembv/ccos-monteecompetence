import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { AnneeAcademiqueModel } from '../../shared/models/annee-academique.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {

  constructor(private apiService : ApiService) { }
  private anneeAcademiqueUrl = environment.anneeAcademiqueUrl
  addAnneAcademique(anneeAcademique : AnneeAcademiqueModel) : Observable<AnneeAcademiqueModel>{
    return this.apiService.post<AnneeAcademiqueModel>(this.anneeAcademiqueUrl,anneeAcademique);
  }
  getAnneeAcademiques() : Observable<AnneeAcademiqueModel[]> {
    return this.apiService.get<AnneeAcademiqueModel[]>(this.anneeAcademiqueUrl)
  }
  getOneAnneeAcademique(id : number) : Observable<AnneeAcademiqueModel> {
    return this.apiService.get<AnneeAcademiqueModel>(`${this.anneeAcademiqueUrl}/${id}`)
  }
  updateAnneeAcademique(anneeAcademique : AnneeAcademiqueModel) : Observable<AnneeAcademiqueModel> {
    return this.apiService.put<AnneeAcademiqueModel>(`${this.anneeAcademiqueUrl}/${anneeAcademique.id}`,anneeAcademique)
  }
  deleteAnneeAcademique(id : number) : Observable<void> {
    return this.apiService.delete<void>(`${this.anneeAcademiqueUrl}/${id}`)
  }
}
