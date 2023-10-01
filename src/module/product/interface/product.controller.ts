import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  HttpException,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductService } from '../application/service/product.service';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { Product } from '../domain/product.entity';
import { ProductMapper } from '../product.mapper';
import { JwtGuard } from '../../../../src/common/guards/jwt.guard';
import { UserRequest } from '../../../../src/common/interfaces/UserRequest';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productMapper: ProductMapper,
  ) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getOneProduct(@Param('id', ParseIntPipe) productId: number) {
    return await this.productService.getOne(productId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateProduct(
    @Body() updateProDto: UpdateProductDto,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    updateProDto.id = productId;
    const updateProduct = this.productMapper.fromDtoToEntity(updateProDto);
    return this.productService.updateProduct(updateProduct, productId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Express.Request,
  ): Promise<Product | HttpException> {
    const newProduct = this.productMapper.fromDtoToEntity(createProductDto);
    return await this.productService.create(newProduct);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Req() req: UserRequest,
  ) {
    return this.productService.remove(req.user.id, productId);
  }
}
