import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FailedAuthComponent } from '../../../components/auth/login/failed-auth/failed-auth.component';
import { LogOutComponent } from '../../../components/auth/login/log-out/log-out.component';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  return authService.isLoggedIn.pipe(
    take(1),
    map((loggedIn: boolean) => {
      
      if (!loggedIn) {
        router.navigate(['/login']);
        dialog.open(LogOutComponent);
        return false;
      }
      return true;
    })
  );
};
