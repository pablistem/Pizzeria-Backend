import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  ParseIntPipe, 
  UseGuards 
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddressService } from './application/service/address.service';
import { CreateAddressDto, UpdateAddressDto } from './application/dto/address.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@ApiTags('Address')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  
  @Get(':id')
  @ApiOperation({ summary: 'get the address information by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: 'the address unique id'
  })
  async getAddress(@Param('id', ParseIntPipe) id: number) {
    return await this.addressService.getAddress(id);
  }

  @Post()
  @ApiOperation({ summary: 'create a new address' })
  @ApiConsumes('application/json')
  @ApiBody({ 
    type: CreateAddressDto, 
    description: 'all the fields should be filled out' 
  })
  async createAddress(@Body() data: CreateAddressDto) {
    return await this.addressService.createAddress(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update an address by id' })
  @ApiConsumes('application/json')
  @ApiParam({ 
    name: 'id', 
    description: 'the address unique id', 
    type: 'number', 
    example: 1 
  })
  @ApiBody({ 
    type: UpdateAddressDto,
    description: 'all the fields are optionals'
  })
  async updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateAddressDto,
  ) {
    return await this.addressService.updateAddress(id, changes);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete an address by id' })
  @ApiParam({ 
    name: 'id',
    type: 'number', 
    example: 1,
    description: 
    'the address unique id', 
  })
  async deleteAddress(@Param('id', ParseIntPipe) id: number) {
    await this.addressService.deleteAddress(id);
  }
}