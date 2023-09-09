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
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductService } from '../application/service/product.service';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { Request } from 'express';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { Product } from '../domain/product.entity';


@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @UseGuards(AdminGuard)
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto, @Req() req: Request):Promise<Product| HttpException> {
    return await this.productService.createProduct(createProductDto)
  }

  @Post('update/:id')
  updateProduct(
    @Body() updateProDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.productService.updateProduct(updateProDto, id);
  }

  @ApiParam({ name: 'id' })
  @Post('delete/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.removeProduct(id);
  }

}
