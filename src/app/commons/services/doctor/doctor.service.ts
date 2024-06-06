import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor, Doctors } from '../../model/doctor/doctor.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  fetchAllDoctorsUrl = `${environment.backend.base_url}/doctors`; 

  constructor(
    private http: HttpClient
  ) { }

  fetchAllDoctors(): Observable<Doctors> {
    return this.http.get<Doctors>(
      this.fetchAllDoctorsUrl
    )
  }

  parseDoctorName(doctorName: string): any {
    const nameParts = doctorName.split(' ');
    return {
      doctorFirstName: nameParts[0],
      doctorLastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
    };
  }
}
