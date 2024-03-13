import { Controller, Get, Post, Put, Delete, Param, Req, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AddressService } from './application/service/address.service';
import { CreateAddressDto, UpdateAddressDto } from './application/dto/address.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';

@UseGuards(JwtGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAddresses(@Req() req: UserRequest) {
    return await this.addressService.getAddresses(req.user.id);
  }
  
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

  @Delete(':id')
  async deleteAddress(@Param('id', ParseIntPipe) id: number) {
    await this.addressService.deleteAddress(id);
  }
}