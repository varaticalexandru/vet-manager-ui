import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { statusOptions } from '../../../commons/model/appointment.model';
import { extractDatePart } from '../../../commons/utils/date-utils';
import { Doctor } from '../../../commons/model/doctor.model';
import { DoctorService } from '../../../commons/services/doctor/doctor.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { Pet } from '../../../commons/model/pet.model';
import { PetService } from '../../../commons/services/pets/pet.service';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    NativeDateModule,
    MatSlideToggleModule,
    DatePipe,
    NgxMatTimepickerModule,
    MatDatepickerModule,
  ],
  providers: [],
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss'],
})
export class AppointmentAddComponent implements OnInit, OnDestroy {
  statusOptions: string[] = [];
  doctors: Doctor[] = [];
  pets: Pet[] = [];
  appointmentForm!: FormGroup;
  newDoctor: boolean = false;
  newPet: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentAddComponent>,
    private doctorService: DoctorService,
    private petService: PetService
  ) {
    this.appointmentForm = this.fb.group({
      newPet: [''],
      petId: [''],
      newDoctor: [''],
      doctorId: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      diagnostic: [''],
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPets();
    this.statusOptions = statusOptions;
  }

  ngOnDestroy(): void {}

  save() {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      
      
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  loadDoctors(): void {
    this.doctorService
      .fetchAllDoctors()
      .pipe(map((data: any): Doctor[] => data.doctors))
      .subscribe((doctors: Doctor[]) => {
        console.log(doctors);

        this.doctors = doctors;
      });
  }

  loadPets(): void {
    this.petService
      .fetchAllPets()
      .pipe(map((data: any): Pet[] => data.pets))
      .subscribe((pets: Pet[]) => {
        console.log(pets);

        this.pets = pets;
      });
  }

  flipNewDoctor() {
    this.newDoctor = !this.newDoctor;
    this.appointmentForm.patchValue({
      newDoctor: this.newDoctor
    });
  }

  flipNewPet() {
    this.newPet = !this.newPet;
    this.appointmentForm.patchValue({
      newPet: this.newPet
    });
  }
}
