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
} from '@nestjs/common';
import { ProductService } from '../application/service/product.service';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getAllProdcuts() {
    return this.getAllProdcuts();
  }

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
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

  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
