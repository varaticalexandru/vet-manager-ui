import { Pet } from '../pet/pet.model';
import { Doctor } from '../doctor/doctor.model';
import { NewService, Service } from '../service/service.model';

export const statusOptions = ['CREATED', 'CONFIRMED', 'CLOSED'];

export type StatusOptions = 'CREATED' | 'CONFIRMED' | 'CLOSED';

export interface Appointment {
  id: number;
  date: string;
  diagnostic: string | null;
  pet: Pet;
  status: StatusOptions;
  doctor: Doctor;
  services: Array<Service>;
  totalCost: number;
}

export interface Appointments {
  appointments: Array<Appointment>
}


export interface NewAppointment {
  date: string | null | undefined;
  newPet: boolean | null | undefined;
  pet: number | string | null | undefined;
  newDoctor: boolean | null | undefined;
  doctor: number | string | null | undefined;
  services: Array<number>;
  newServices: Array<NewService>;
}

export interface UpdAppointment {
  id: number | null | undefined;
  date: string | null | undefined;
  newPet: boolean | null | undefined;
  pet: number | string | null | undefined;
  newDoctor: boolean | null | undefined;
  doctor: number | string | null | undefined;
  services: Array<number>;
  newServices: Array<NewService>;
  diagnostic: string | null | undefined;
  status: StatusOptions | null | undefined;
}

export interface PaginatedResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Array<Appointment>;
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

export const emptyAppointmentsPaginated: PaginatedResponse = {
    totalElements: 0,
    totalPages: 0,
    size: 5,
    content: [] as Array<Appointment>,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    last: false,
    numberOfElements: 0,
    pageable: {
      pageNumber: 0,
      pageSize: 5,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false
    },
    empty: true
}

export function getIconForStatus(status: string): string {
  switch (status) {
    case 'CREATED':
      return 'create';
    case 'CONFIRMED':
      return 'check_circle';
    case 'CLOSED':
      return 'lock';
    default:
      return '';
  }
}