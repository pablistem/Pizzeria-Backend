export interface ICreateOpntion {
  variant: string;
  price: number;
  product: number;
}
export interface IUpdateOption {
  id: number;
  variant?: string;
  price?: number;
  product?: number;
}
