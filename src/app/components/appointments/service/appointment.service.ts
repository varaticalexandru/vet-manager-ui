import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Appointments } from '../model/appointments.model';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../model/paginated-response.model';
import { emptyPaginatedResponse } from '../../../commons/utils/paginated-response.utils';
import { Appointment, AppointmentUpdate } from '../../../commons/model/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  fetch_all_url = `${environment.backend.url}/appointments/all`;
  fetch_by_pageable_and_filters = `${environment.backend.url}/appointments`;
  update_url = `${environment.backend.url}/appointments`;

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

    return this.http.get<PaginatedResponse>(this.fetch_by_pageable_and_filters, { params }).pipe(
      catchError(() => of(emptyPaginatedResponse())
    ));
  }

  updateAppointment(id: number, appointment: Partial<AppointmentUpdate>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.update_url}/${id}`, appointment);
  }
}