import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { InscriptionModel } from '../../shared/models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
    private inscriptionUrl = environment.inscriptionUrl;

    constructor(private apiService: ApiService) { }

    getInsctiptions(): Observable<InscriptionModel[]> {
      return this.apiService.get<InscriptionModel[]>(this.inscriptionUrl);
    }

    getOneInscription(id: number): Observable<InscriptionModel> {
      return this.apiService.get<InscriptionModel>(`${this.inscriptionUrl}/${id}`);
    }

    addInscription(inscription: InscriptionModel): Observable<InscriptionModel> {
      return this.apiService.post<InscriptionModel>(this.inscriptionUrl, inscription);
    }

    updateInscription(inscription: InscriptionModel): Observable<InscriptionModel> {
      return this.apiService.put<InscriptionModel>(`${this.inscriptionUrl}/${inscription.id}`, inscription);
    }

    deleteInscription(id: number): Observable<void> {
      return this.apiService.delete<void>(`${this.inscriptionUrl}/${id}`);
    }

    getEtudiantInscriptions(id : number) : Observable<InscriptionModel[]>{
      return this.apiService.get<InscriptionModel[]>(`${this.inscriptionUrl}/list-inscription-etudiant/${id}`)
    }
}
