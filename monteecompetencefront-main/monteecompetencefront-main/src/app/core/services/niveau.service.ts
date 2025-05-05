import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { NiveauModel } from '../../shared/models/niveau.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(private apiService : ApiService) { }
  private niveauUrl = environment.niveauUrl
  addNiveau(niveau : NiveauModel) : Observable<NiveauModel>{
    return this.apiService.post<NiveauModel>(this.niveauUrl,niveau)
  }
  getNiveaux() : Observable<NiveauModel[]>{
    return this.apiService.get<NiveauModel[]>(this.niveauUrl)
  }
  getOneNiveau(id : number) : Observable<NiveauModel>{
    return this.apiService.get<NiveauModel>(`${this.niveauUrl}/${id}`)
  }
  updateNiveau(niveau : NiveauModel) : Observable<NiveauModel>{
    return this.apiService.put<NiveauModel>(`${this.niveauUrl}/${niveau.id}`,niveau)
  }
  deleteNiveau(id : number) : Observable<void>{
    return this.apiService.delete<void>(`${this.niveauUrl}/${id}`)
  }
}
