export type Currency = 'USD' | 'EUR' | 'RON';

export const currencies: String[] = ['USD', 'EUR', 'RON'];

export interface Price {
  cost: number;
  currency: Currency;
}

export interface Service {
  id: number;
  name: string;
  price: Price;
}

export interface NewService {
  name: string;
  price: string;
}

export interface Services {
  services: Array<Service>;
}
