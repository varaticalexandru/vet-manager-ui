import { Pet } from '../pet/pet.model';
import { Doctor } from '../doctor/doctor.model';
import { Service } from '../service/service.model';

export const statusOptions = ['CREATED', 'CONFIRMED', 'CLOSED'];

export type StatusOptions = 'CREATED' | 'CONFIRMED' | 'CLOSED';

export interface Appointment {
  id: number;
  date: string;
  diagnostic: string | null;
  pet: Pet;
  status: StatusOptions;
  doctor: Doctor;
  services: Service[];
  totalCost: number;
}

export interface Appointments {
  appointments: Array<Appointment>
}


export interface NewAppointment {
  date: string;
  newPet: boolean | null | undefined;
  pet: number | string | null | undefined;
  newDoctor: boolean | null | undefined;
  doctor: number | string | null | undefined;
}

export interface AppointmentUpdate {
  id: number;
  date: string;
  diagnostic: string | null;
  petId: number;
  petName: Pet;
  status: StatusOptions;
  doctorId: number;
  doctorFirstName: string;
  doctorLastName: string;
}

export interface PaginatedResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Appointment[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}