import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../service/appointment.service';
import { Appointments } from '../model/appointments.model';


@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatCardModule,
    

  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit, OnDestroy {

  constructor(
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.fetchAllAppointments().subscribe(
      (appointments: Appointments) => {
        console.log(appointments);
      }
    )
  }

  ngOnDestroy(): void {}

}
