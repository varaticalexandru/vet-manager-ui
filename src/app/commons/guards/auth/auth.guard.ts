import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn.pipe(
    take(1),
    map((loggedIn: boolean) => {
      console.log('logged in', loggedIn);
      
      if (!loggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
