import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppointmentService } from '../../../commons/services/appointment/appointment.service';
import { TableComponent } from './appointments-table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentAddComponent } from '../appointment-add/appointment-add.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  Appointment,
  PaginatedResponse,
} from '../../../commons/model/appointment/appointment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../commons/services/auth/auth-service/auth.service';
import { LogOutComponent } from '../../auth/login/log-out/log-out.component';
import { LogOutConfirmComponent } from '../../auth/login/log-out-confirm/log-out-confirm.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatCardModule,
    TableComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments: Array<Appointment> = [];
  sortBy: string = 'date';
  sortOrder: string = 'desc';
  page: number = 0;
  size: number = 5;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    
  }


  ngOnDestroy(): void {}

  goToNewAppointment() {
    const dialogRef = this.dialog.open(AppointmentAddComponent, {
      maxWidth: '1200',
      maxHeight: '800',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
        this._snackBar.open('Appointment created successfully', 'Close', {
          duration: 5000,
          politeness: 'assertive',
        });
      }
    });
  }

  logout() {
    const dialogRef = this.dialog.open(LogOutConfirmComponent, {
      maxWidth: '1200',
      maxHeight: '800',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logout();
        this.dialog.open(LogOutComponent, {
          maxWidth: '1200',
          maxHeight: '800',
        });
      }
    });
  }
}
