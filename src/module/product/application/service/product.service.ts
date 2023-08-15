import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  ){}
  async createProduct(product) {
    await this.productRepository.saveProduct(product)
  }

  async updateProduct(updateProDto:UpdateProductDto,id:number){
    const productFound = await this.productRepository.findProduct(id)
    if(!productFound) {
      throw new NotFoundException('Procut not found')
    }

    productFound.category=updateProDto.category
    productFound.description= updateProDto.description
    productFound.name=updateProDto.name
    productFound.price=updateProDto.price
    productFound.stock=updateProDto.sotck
    productFound.image=updateProDto.image

    await this.productRepository.saveProduct(productFound)
  }

  async removeProduct(id:number){
    const productFound = await this.productRepository.findProduct(id)
    await this.productRepository.deleteProduct(productFound)
  }
  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}