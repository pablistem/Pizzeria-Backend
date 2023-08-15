import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  saveProduct(product: Product): Promise<void>;
  findProduct(id: number): Promise<Product | null>;
  deleteProduct(product: Product);
}
