import { Routes } from '@angular/router';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { authGuard } from '../../../commons/guards/auth/auth.guard';

export const APPOINTMENT_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentListComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '',
  },
];
