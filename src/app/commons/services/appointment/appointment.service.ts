import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Appointment, NewAppointment, Appointments, PaginatedResponse, emptyAppointmentsPaginated, UpdAppointment } from '../../model/appointment/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  base_url = `${environment.backend.url}/appointments`;
  fetch_all_url = `${environment.backend.url}/appointments/all`;

  constructor(private http: HttpClient) {}

  fetchAllAppointments(): Observable<Appointments> {
    return this.http.get<Appointments>(this.fetch_all_url);
  }

  fetchAppointmentsByPageable(
    sort: string,
    order: string,
    page: number,
    size: number,
    petName?: string | null,
    doctorFirstName?: string | null,
    doctorLastName?: string | null,
    status?: string | null,
    date?: string | null,
    diagnostic?: string | null,
    totalCost?: number | null
  ): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sort},${order}`);

    if (petName) {
      params = params.set('petName', petName);
    }
    if (doctorFirstName) {
      params = params.set('doctorFirstName', doctorFirstName);
    }
    if (doctorLastName) {
      params = params.set('doctorLastName', doctorLastName);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (date) {
      params = params.set('date', date);
    }
    if (diagnostic) {
      params = params.set('diagnostic', diagnostic);
    }
    if (totalCost) {
      params = params.set('totalCost', totalCost.toString());
    }

    return this.http.get<PaginatedResponse>(this.base_url, { params }).pipe(
      catchError(() => of(emptyAppointmentsPaginated)
    ));
  }

  addAppointment(appointment: NewAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.base_url}`, appointment);
  }

  updateAppointment(id: number, appointment: UpdAppointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.base_url}/${id}`, appointment);
  }

  deleteAppoitnment(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.base_url}/${id}`);
  }
}
