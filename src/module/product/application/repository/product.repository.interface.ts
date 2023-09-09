import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findOne(id: number): Promise<Product | null>;
  delete(product: Product):Promise<void>;
  getAll():Promise<Product[]>;
}
