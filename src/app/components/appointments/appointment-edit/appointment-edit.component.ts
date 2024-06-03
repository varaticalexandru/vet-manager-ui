import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Appointment } from '../../../commons/model/appointment.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { extractDatePart } from '../../../commons/utils/date-utils';
import { MatSelectModule } from '@angular/material/select';
import { statusOptions } from '../../../commons/model/appointment.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment-edit',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    NativeDateModule
  ],
  templateUrl: './appointment-edit.component.html',
  styleUrl: './appointment-edit.component.scss',
})
export class AppointmentEditComponent implements OnInit, OnDestroy {
  
  statusOptions: string[] = [];
  appointmentForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {

    this.appointmentForm = this.fb.group({
      petName: [data.pet.name, Validators.required],
      doctorFirstName: [data.doctor.firstName, Validators.required],
      doctorLastName: [data.doctor.lastName, Validators.required],
      date: [extractDatePart(data.date), Validators.required],
      status: [data.status, Validators.required],
      diagnostic: [data.diagnostic],
      totalCost: [{ value: data.totalCost, disabled: true }],
    });
  }

  save() {
    if (this.appointmentForm.valid) {
      
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.statusOptions = statusOptions;
  }

  ngOnDestroy(): void {}
}
