import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../../infrastructure/product.repository';
import { IProductRepository } from '../repository/product.repository.interface';
import { Product } from '../../domain/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async createProduct(product: CreateProductDto): Promise<HttpException | Product> {
    const newProduct = new Product()
    const savedProduct = await this.productRepository.save(newProduct)
    return savedProduct
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: number,
  ): Promise<Product> {
    const productFound = await this.productRepository.findOne(id);
    if (!productFound) {
      throw new NotFoundException('Product not found');
    } else {


      try {
        return await this.productRepository.save(productFound);
      } catch (err) {
        return err;
      }
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
