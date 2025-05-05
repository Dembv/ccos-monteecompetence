import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const userRoles = authService.getUserRoles();

  if (!userRoles) {
    router.navigate(['/auth/login']);
    return false;
  }

  const hasRole = userRoles.some(role => expectedRoles.includes(role));

  if (!hasRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
