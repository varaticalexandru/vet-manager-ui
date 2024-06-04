import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  Appointment,
  UpdAppointment,
} from '../../../commons/model/appointment/appointment.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  extractDatePart,
  extractLocalTime,
  getDateTime,
} from '../../../commons/utils/date-utils';
import { MatSelectModule } from '@angular/material/select';
import { statusOptions } from '../../../commons/model/appointment/appointment.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Doctor } from '../../../commons/model/doctor/doctor.model';
import { Pet } from '../../../commons/model/pet/pet.model';
import {
  Service,
  Services,
} from '../../../commons/model/service/service.model';
import { map } from 'rxjs';
import { AppointmentService } from '../../../commons/services/appointment/appointment.service';
import { DoctorService } from '../../../commons/services/doctor/doctor.service';
import { PetService } from '../../../commons/services/pets/pet.service';
import { ServiceService } from '../../../commons/services/service/service.service';
import { getIconForStatus } from '../../../commons/model/appointment/appointment.model';

@Component({
  selector: 'app-appointment-edit',
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
    NgxMatTimepickerModule,
    DatePipe,
    CurrencyPipe,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './appointment-edit.component.html',
  styleUrl: './appointment-edit.component.scss',
})
export class AppointmentEditComponent implements OnInit, OnDestroy {
  statusOptions: string[] = [];
  doctors: Doctor[] = [];
  pets: Pet[] = [];
  services: Service[] = [];
  newDoctor: boolean = false;
  newPet: boolean = false;

  appointmentForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentEditComponent>,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private petService: PetService,
    private serviceService: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {
    this.appointmentForm = this.fb.group({
      newPet: [''], //boolean flag
      pet: [''],
      newDoctor: [''], // boolean flag
      doctor: [''],
      date: [extractDatePart(data.date), Validators.required],
      time: [extractLocalTime(data.date), Validators.required],
      status: [data.status, Validators.required],
      diagnostic: [data.diagnostic],
      services: [data.services.map((service: Service) => service.id), Validators.required],
      newServices: this.fb.array([]),
      totalCost: [{ value: data.totalCost, disabled: true }],
    });
  }

  ngOnInit(): void {
    this.statusOptions = statusOptions;
    this.loadServices();
    this.loadDoctors();
    this.loadPets();

    this.appointmentForm.controls['pet'].setValue(this.data.pet.id);
    this.appointmentForm.controls['doctor'].setValue(this.data.doctor.id);
  }

  save() {
    if (this.appointmentForm.valid) {
      const reqObj: UpdAppointment = {
        id: this.data.id,
        date: getDateTime(
          this.appointmentForm.value['date'],
          this.appointmentForm.value['time']
        ),
        newPet:
          this.appointmentForm.value['newPet'] === ''
            ? false
            : this.appointmentForm.value['newPet'],
        pet: this.appointmentForm.value['pet'],
        newDoctor:
          this.appointmentForm.value['newDoctor'] === ''
            ? false
            : this.appointmentForm.value['newDoctor'],
        doctor: this.appointmentForm.value['doctor'],
        services: this.appointmentForm.value['services'],
        newServices: this.appointmentForm.value['newServices'],
        status: this.appointmentForm.value['status'],
        diagnostic: this.appointmentForm.value['diagnostic'],
      };

      
      this.appointmentService
        .updateAppointment(this.data.id, reqObj)
        .subscribe((response: Appointment) => {
          // console.log(response)
        });

      this.dialogRef.close(true);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {}

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
    this.serviceService.fetchAllServices().subscribe((services: Services) => {
      this.services = services.services;
    });
  }

  flipNewDoctor() {
    this.newDoctor = !this.newDoctor;
    this.appointmentForm.patchValue({
      newDoctor: this.newDoctor,
    });
  }

  flipNewPet() {
    this.newPet = !this.newPet;
    this.appointmentForm.patchValue({
      newPet: this.newPet,
    });
  }

  get newServices(): FormArray {
    return this.appointmentForm.get('newServices') as FormArray;
  }

  addNewService() {
    const newServiceGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.newServices.push(newServiceGroup);
  }

  removeNewService(index: number) {
    this.newServices.removeAt(index);
  }

  getIconByStatus = getIconForStatus;
}
