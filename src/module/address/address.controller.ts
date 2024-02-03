import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './application/service/address.service';
import { UpdateAddressDto } from './application/dto/address.dto';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  
  @Get(':id')
  async getAddresses(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.getAddress(id);
  }

  @Post()
  async createAddresses(@Body() data: any) {
    return await this.addressService.createAddress(data);
  }

  @Put(':id')
  async updateAddresses(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, changes);
  }

  @Delete(':id')
  async deleteAddresses(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateAddressDto,
  ) {
    return await this.addressService.removeAddress(id, changes)
  }
}