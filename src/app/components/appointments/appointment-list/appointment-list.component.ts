import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../../commons/services/appointment/appointment.service';
import { TableComponent } from './appointments-table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentAddComponent } from '../appointment-add/appointment-add.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Appointments } from '../../../commons/model/appointment/appointment.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatCardModule,
    TableComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService
      .fetchAllAppointments()
      .subscribe((appointments: Appointments) => {
        // console.log(appointments);
      });
  }

  ngOnDestroy(): void {}

  goToNewAppointment() {
    const dialogRef = this.dialog.open(AppointmentAddComponent, {
      maxWidth: '1200',
      maxHeight: '800',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
    });
  }
}
