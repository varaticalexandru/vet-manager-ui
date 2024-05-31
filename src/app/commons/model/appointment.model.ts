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
}