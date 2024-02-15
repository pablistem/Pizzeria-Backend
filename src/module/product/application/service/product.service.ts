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
import { UserService } from 'src/module/user/application/service/user.service';
import { RoleEnum } from 'src/module/user/domain/user.entity';
import { TestService } from 'src/module/test/application/service/test.service';
import { ConfigService } from '@nestjs/config';
import { fixtureDemoTree } from 'src/common/fixtures/fixtureTree';

@Injectable()
export class ProductService {
  NODE_ENV = this.config.get('NODE_ENV');
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
    private readonly userService: UserService,
    private readonly testService: TestService,
    private readonly config: ConfigService,
  ) {}

  public productsList: Product[] = [];

  async create(
    product: Product,
    userId: number,
  ): Promise<HttpException | Product> {
    const admin = await this.userService.validateUserAdmin(userId);
    if (admin) {
      const productSaved = await this.productRepository.save(product);
      this.refreshList();
      return productSaved;
    } else {
      throw new HttpException('User have not access', HttpStatus.UNAUTHORIZED);
    }
  }

  async getOne(id: number): Promise<Product> {
    const productFound = await this.productRepository.findOne(id);
    if (!productFound) {
      throw new HttpException('Product Not Found', 404);
    }
    return productFound;
  }

  async updateProduct(updateProductDto: Product, id: number): Promise<Product> {
    const productFound = await this.productRepository.findOne(id);
    if (!productFound) {
      throw new NotFoundException('Product not found');
    } else {
      return this.productRepository.update(updateProductDto);
    }
  }

  async remove(userId: number, productId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      try {
        await this.productRepository.delete(productId);
        return { message: 'Entity delete complete' };
      } catch (err) {
        throw new NotFoundException('Product not found');
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAllProducts() {
    return this.productRepository.getAll();
  }

  updateList = async () => {
    this.productsList = await this.getAllProducts();
  };

  async onApplicationBootstrap() {
    if (this.NODE_ENV === 'development') {
      await this.testService.load(fixtureDemoTree);
    }

    await this.updateList();
  }

  async refreshList() {
    await this.getAllProducts();
  }
}
