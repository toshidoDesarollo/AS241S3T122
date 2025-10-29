export interface Producto {
  id?: number;
  name: string;
  categories: string;
  brand: string;
  unit_measure: string;
  unit_price: number| null;
  minimum_stock: number| null;
  toxicity: string;
  expiration_date: string;
  state: string;
}