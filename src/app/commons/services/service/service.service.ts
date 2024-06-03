import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Service, Services } from '../../model/service/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = `${environment.backend.url}/services`;

  constructor(
    private http: HttpClient
  ) { }

  fetchAllServices(): Observable<Services> {
    return this.http.get<Services>(
      this.baseUrl
    );
  }
  
}
