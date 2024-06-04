import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
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
import { Appointment, NewAppointment, statusOptions } from '../../../commons/model/appointment/appointment.model';
import { extractDatePart, getDateTime } from '../../../commons/utils/date-utils';
import { Doctor } from '../../../commons/model/doctor/doctor.model';
import { DoctorService } from '../../../commons/services/doctor/doctor.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable, map } from 'rxjs';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { Pet } from '../../../commons/model/pet/pet.model';
import { PetService } from '../../../commons/services/pets/pet.service';
import { AppointmentService } from '../../../commons/services/appointment/appointment.service';
import { ServiceService } from '../../../commons/services/service/service.service';
import { Service, NewService, Services } from '../../../commons/model/service/service.model';
import { MatIconModule } from '@angular/material/icon';

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
    CurrencyPipe,
    MatIconModule,
  ],
  providers: [],
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss'],
})
export class AppointmentAddComponent implements OnInit, OnDestroy {
  statusOptions: string[] = [];
  doctors: Doctor[] = [];
  pets: Pet[] = [];
  services: Service[] = [];
  appointmentForm!: FormGroup;
  newDoctor: boolean = false;
  newPet: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentAddComponent>,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private petService: PetService,
    private serviceService: ServiceService
  ) {
    this.appointmentForm = this.fb.group({
      newPet: [''], //boolean flag
      pet: [''],
      newDoctor: [''],  // boolean flag
      doctor: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      services: ['', Validators.required],
      newServices: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadDoctors();
    this.loadPets();
    this.statusOptions = statusOptions;
  }

  ngOnDestroy(): void {}

  save() {
    
    if (this.appointmentForm.valid) {
      const reqObj: NewAppointment = {
        date:  getDateTime(
          this.appointmentForm.value['date'],
          this.appointmentForm.value['time'],
        ),
        // check if trimed value is empty, if so set to false
        newPet: this.appointmentForm.value['newPet'] === '' ? false : this.appointmentForm.value['newPet'],
        pet: this.appointmentForm.value['pet'],
        newDoctor: this.appointmentForm.value['newDoctor'] === '' ? false : this.appointmentForm.value['newDoctor'],
        doctor: this.appointmentForm.value['doctor'],
        services: this.appointmentForm.value['services'],
        newServices: this.appointmentForm.value['newServices']
      }

      console.log(reqObj);

      this.appointmentService.addAppointment(reqObj).subscribe((response: Appointment) => console.log(response));
      
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

        this.doctors = doctors;
      });
  }

  loadPets(): void {
    this.petService
      .fetchAllPets()
      .pipe(map((data: any): Pet[] => data.pets))
      .subscribe((pets: Pet[]) => {

        this.pets = pets;
      });
  }

  loadServices() {
    this.serviceService
      .fetchAllServices()
      .subscribe((services: Services) => {
        this.services = services.services;
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

  get newServices(): FormArray {
    return this.appointmentForm.get('newServices') as FormArray;
  }

  addNewService() {
    const newServiceGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.newServices.push(newServiceGroup);
  }

  removeNewService(index: number) {
    this.newServices.removeAt(index);
  }
}