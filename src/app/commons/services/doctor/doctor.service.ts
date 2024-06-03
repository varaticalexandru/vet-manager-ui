import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../model/doctor.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  fetchAllDoctorsUrl = `${environment.backend.url}/doctors`; 

  constructor(
    private http: HttpClient
  ) { }

  fetchAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
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
