import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { EtudiantModel } from '../../shared/models/etudiant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private etudiantUrl = environment.etudiantUrl;

  constructor(private apiService: ApiService) { }

  getEtudiants(): Observable<EtudiantModel[]> {
    return this.apiService.get<EtudiantModel[]>(this.etudiantUrl);
  }

  getOneEtudiant(id: number): Observable<EtudiantModel> {
    return this.apiService.get<EtudiantModel>(`${this.etudiantUrl}/${id}`);
  }

  addEtudiant(etudiant: EtudiantModel): Observable<EtudiantModel> {
    return this.apiService.post<EtudiantModel>(this.etudiantUrl, etudiant);
  }

  updateEtudiant(etudiant: EtudiantModel): Observable<EtudiantModel> {
    return this.apiService.put<EtudiantModel>(`${this.etudiantUrl}/${etudiant.id}`, etudiant);
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.etudiantUrl}/${id}`);
  }

  getEtudiantByUser(id: number): Observable<EtudiantModel> {
    return this.apiService.get<EtudiantModel>(`${this.etudiantUrl}/by-user/${id}`);
  }
}
