import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  openAppointments(): Promise<boolean> {
    return this.router.navigate(['appointments']);
  }

  openAppointment(id: string): Promise<boolean> {
    return this.router.navigate(['appointments', id]);
  }
}
