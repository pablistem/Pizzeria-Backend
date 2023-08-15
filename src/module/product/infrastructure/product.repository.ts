import { Injectable } from '@nestjs/common';
import { Product } from '../domain/product.entity';
import { DataSource, Repository } from 'typeorm';
import { IProductRepository } from '../application/repository/product.repository.interface';
import { setMaxIdleHTTPParsers } from 'http';

@Injectable()
export class ProductRepository implements IProductRepository {
  repository: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Product);
  }

  async saveProduct(product: Product): Promise<void> {
    const createProduct = this.repository.create(product);
    await this.repository.save(createProduct);
  }

  async findProduct(id: number): Promise<Product | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async deleteProduct(product:Product){
    await this.repository.remove(product)
  }
}
