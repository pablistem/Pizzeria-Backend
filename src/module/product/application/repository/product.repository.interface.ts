import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findOne(id: number): Promise<Product | null>;
  delete(productId: number): Promise<void>;
  getAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
}
