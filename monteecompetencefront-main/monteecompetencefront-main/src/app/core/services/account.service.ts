import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { ResetPasswordModel } from '../../shared/models/reset-password.model';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = environment.accountUrl;

  constructor(private apiService: ApiService) { }

  resetPassword(resetPassword: ResetPasswordModel): Observable<any> {
    return this.apiService.post<ResetPasswordModel>(`${this.accountUrl}/reset-password/finish`, resetPassword);
  }

  getAccount(): Observable<UserModel> {
    return this.apiService.get<UserModel>(this.accountUrl);
  }

}
