import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Product } from '../domain/product.entity';
import { IProductRepository } from '../application/repository/product.repository.interface';
import { Category } from 'src/module/category/application/domain/category.entity';

@Injectable()
export class ProductRepository implements IProductRepository {
  repository: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Product);
  }

  async save(product: Product): Promise<Product> {
    const createProduct = this.repository.create(product);
    return await this.repository.save(createProduct);
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async delete(productId: number): Promise<void> {
    const productFound = await this.repository.findOne({
      where: { id: productId },
      relations: [Category.name.toLocaleLowerCase()],
    });
    await this.repository.remove(productFound);
  }

  async update(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return await this.repository.find();
  }
}
