import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken(); // suppose que ton service a une méthode getToken()

  // Ne pas ajouter d'en-tête Authorization pour le login
  if (req.url.includes('/api/authenticate')) {
    return next(req);

  }

  if (authToken) {
    // Cloner la requête pour ajouter l'Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Si pas de token, laisser passer la requête originale
  return next(req);
};
