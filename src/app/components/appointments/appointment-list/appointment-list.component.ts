import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../service/appointment.service';
import { Appointments } from '../model/appointments.model';
import { TableComponent } from './appointments-table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatCardModule,
    TableComponent,
    MatButtonModule,
    MatIconModule

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
        // console.log(appointments);
      }
    )
  }

  ngOnDestroy(): void {}

}
