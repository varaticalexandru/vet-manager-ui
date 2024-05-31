export interface Price {
    cost: number;
    currency: string;
  }
  
  export interface Service {
    id: number;
    name: string;
    price: Price;
  }