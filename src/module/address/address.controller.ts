import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AddressService } from './application/service/address.service';
import { CreateAddressDto, UpdateAddressDto } from './application/dto/address.dto';
import { AddAddressDto } from './application/dto/add-remove-address.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  
  @Get(':id')
  async getAddress(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.getAddress(id);
  }

  @Post()
  async createAddress(@Body() data: CreateAddressDto) {
    return await this.addressService.createAddress(data);
  }

  @Put(':id')
  async updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, changes);
  }

  @Put('add/:id')
  async addAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: AddAddressDto,
  ) {
    return await this.addressService.addAddress(id, changes);
  }

  @Put('remove/:id')
  async removeAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: AddAddressDto,
  ) {
    return await this.addressService.removeAddress(id, changes)
  }
}