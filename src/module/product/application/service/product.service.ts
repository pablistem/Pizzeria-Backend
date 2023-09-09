import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/product.repository';
import { IProductRepository } from '../repository/product.repository.interface';
import { Product } from '../../domain/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(product: Product): Promise<HttpException | Product> {
    return await this.productRepository.save(product)
  }

  async updateProduct(
    updateProductDto: Product,
    id: number,
  ): Promise<Product> {
    const productFound = await this.productRepository.findOne(id);
    if (!productFound) {
      throw new NotFoundException('Product not found');
    } else {
      return this.productRepository.update(updateProductDto)
    }
  }

  async removeProduct(id: number) {
    const productFound = await this.productRepository.findOne(id);
    await this.productRepository.delete(productFound);
  }
  async getAllProducts() {
    return this.productRepository.getAll();
  }

}
