import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Pet, Pets } from '../../model/pet/pet.model';
import { Observable } from 'rxjs';
import { Doctor } from '../../model/doctor/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  fetchAllPetsUrl = `${environment.backend.url}/pets`; 

  constructor(
    private http: HttpClient
  ) { }

  fetchAllPets(): Observable<Pets> {
    return this.http.get<Pets>(
      this.fetchAllPetsUrl
    )
  }
}
