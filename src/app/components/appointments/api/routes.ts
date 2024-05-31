import { Routes } from "@angular/router";
import { AppointmentListComponent } from "../appointment-list/appointment-list.component";

export const APPOINTMENT_ROUTES: Routes = [

    { path: '', component: AppointmentListComponent },


    { path: '**', redirectTo: '' }
]