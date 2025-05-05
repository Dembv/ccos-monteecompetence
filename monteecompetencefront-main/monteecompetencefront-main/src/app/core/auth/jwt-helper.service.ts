import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now().valueOf() / 1000; // secondes
      return decoded.exp < now;
    } catch (error) {
      console.error('Token decoding failed', error);
      return true;
    }
  }
}
