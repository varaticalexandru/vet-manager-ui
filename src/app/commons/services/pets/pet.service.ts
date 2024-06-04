import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Pets } from '../../model/pet/pet.model';
import { Observable } from 'rxjs';

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
