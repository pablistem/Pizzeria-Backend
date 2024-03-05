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
    const newAddress = new Address()
    newAddress.country = data.country;
    newAddress.state = data.state;
    newAddress.city = data.city;
    newAddress.street = data.street;
    newAddress.height = data.height;
    newAddress.postalCode = data.postalCode;
    return await this.addressRepository.create(newAddress);
  }

  async updateAddress(id: number, changes: UpdateAddressDto) {
    await this.getAddress(id);
    const updateAddress = new Address()
    updateAddress.country = changes.country;
    updateAddress.state = changes.state;
    updateAddress.city = changes.city;
    updateAddress.street = changes.street;
    updateAddress.height = changes.height;
    updateAddress.postalCode = changes.postalCode;
    return await this.addressRepository.update(updateAddress);
  }

  async deleteAddress(id: number) {
    await this.getAddress(id);
    await this.addressRepository.delete(id);
  }
}