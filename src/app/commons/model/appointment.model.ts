import { Pet } from './pet.model';
import { Doctor } from './doctor.model';
import { Service } from './service.model';

export interface Appointment {
  id: number;
  date: string;
  diagnostic: string | null;
  pet: Pet;
  status: 'CREATED' | 'CONFIRMED' | 'CLOSED';
  doctor: Doctor;
  services: Service[];
  totalCost: number;
}

export interface AppointmentUpdate {
    id: number;
    date: string;
    diagnostic: string | null;
    petName: Pet;
    status: 'CREATED' | 'CONFIRMED' | 'CLOSED';
    doctorFirstName: string;
    doctorLastName: string;
  }
  

export const statusOptions = ['CREATED', 'CONFIRMED', 'CLOSED'];