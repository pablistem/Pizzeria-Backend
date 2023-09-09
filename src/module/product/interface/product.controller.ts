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
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductService } from '../application/service/product.service';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { Product } from '../domain/product.entity';
import { ProductMapper } from '../product.mapper';
import { JwtGuard } from '../../../../src/common/guards/jwt.guard';


@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly productMapper: ProductMapper) {}

  @Get('/')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto, @Req() req: Express.Request):Promise<Product| HttpException> {
    console.log(req)
    console.log(createProductDto)
    const newProduct = this.productMapper.fromDtoToEntity(createProductDto)
    return await this.productService.create(newProduct)
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  async updateProduct(
    @Body() updateProDto: UpdateProductDto,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    updateProDto.id = productId
    const updateProduct = this.productMapper.fromDtoToEntity(updateProDto);
    return this.productService.updateProduct(updateProduct, productId)
  }

  @ApiParam({ name: 'id' })
  @Post('delete/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.removeProduct(id);
  }

}
