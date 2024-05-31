import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},

    { path: 'login', component: LoginComponent },
    { path: 'appointments', loadChildren: () => import('./components/appointments/api/index').then(m => m.APPOINTMENT_ROUTES) },


    { path: '**', redirectTo: 'login' }
];
