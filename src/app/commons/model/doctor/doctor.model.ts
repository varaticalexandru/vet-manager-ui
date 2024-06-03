export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Doctors {
  doctors: Array<Doctor>;
}