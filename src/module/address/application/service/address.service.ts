import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ADDRESS_REPOSITORY, IAddressRepository } from '../repository/address.repository.interface';
import { Address } from '../../domain/address.entity';
import { CreateAddressDto, UpdateAddressDto } from '../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY) 
    private readonly addressRepository: IAddressRepository) {}

  async getAddress(id: number): Promise<Address>  {
    const addressFound = await this.addressRepository.findOne(id)
    if (!addressFound) throw new NotFoundException('address not found!')
    return addressFound;
  }

  async createAddress(data: CreateAddressDto) {
    return await this.addressRepository.create(data);
  }

  async updateAddress(id: number, changes: UpdateAddressDto) {
    await this.getAddress(id);
    return await this.addressRepository.update(changes);
  }

  async deleteAddress(id: number) {
    await this.getAddress(id);
    await this.addressRepository.delete(id);
  }
}