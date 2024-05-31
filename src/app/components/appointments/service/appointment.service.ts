import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../model/appointments.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  fetch_all_url = `${environment.backend.url}/appointments`;

  constructor(
    private http: HttpClient
  ) { }

  fetchAllAppointments(): Observable<Appointments> {
    return this.http.get<Appointments>(
      this.fetch_all_url
    );
  }

}
