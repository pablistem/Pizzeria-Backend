import { Product } from 'src/module/product/domain/product.entity';

export interface ICreateOption {
  variant: string;
  price: number;
}
export interface IUpdateOption {
  id: number;
  variant?: string;
  price?: number;
}
