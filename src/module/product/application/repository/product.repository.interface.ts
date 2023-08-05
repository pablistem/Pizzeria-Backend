import { Product } from "../../domain/product.entity";

export interface IProductRepository {
    saveProduct(product: Product):Promise<void>
} 