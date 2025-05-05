import { Injectable } from '@angular/core';
import { JwtHelperService } from './jwt-helper.service';
import { environment } from '../../../environments/environment';
import { ApiService } from '../services/api.service';
import { AuthModel } from '../../shared/models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;

  constructor(private jwtHelper: JwtHelperService, private apiService: ApiService) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('user_roles');
    return roles ? JSON.parse(roles) : [];
  }

  saveToken(token: string, roles: any): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_roles', JSON.stringify(roles));
  }

  authenticate(auth: AuthModel): Observable<any> {
    return this.apiService.post(this.authUrl, auth);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_roles');
  }


}
