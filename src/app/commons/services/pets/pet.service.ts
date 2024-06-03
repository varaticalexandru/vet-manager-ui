import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Pet } from '../../model/pet.model';
import { Observable } from 'rxjs';
import { Doctor } from '../../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  fetchAllPetsUrl = `${environment.backend.url}/pets`; 

  constructor(
    private http: HttpClient
  ) { }

  fetchAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(
      this.fetchAllPetsUrl
    )
  }
}
