import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../../infrastructure/address.repository';
import { IAddressRepository } from '../repository/address.repository.interface';
import { Address } from '../../domain/address.entity';
import { CreateAddressDto, UpdateAddressDto } from '../dto/address.dto';
import { AddAddressDto } from '../dto/add-remove-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(AddressRepository) 
    private readonly addressRepository: IAddressRepository) {}

  async getAddress(id: number) {
    const addressFound = await this.addressRepository.findOne(id)
    if (!addressFound) throw new NotFoundException('addresses not found!')
    return addressFound;
  }

  async createAddress(data: CreateAddressDto) {
    return await this.addressRepository.create(data);
  }

  async updateAddress(id: number, changes: UpdateAddressDto) {
    const addressFound = await this.addressRepository.findOne(id);
    if (!addressFound) throw new NotFoundException('addresses not found!')
    return await this.addressRepository.update(changes);
  }

  async addAddress(id: number, changes: AddAddressDto) {
    const addressFound = await this.addressRepository.findOne(id);
    if (addressFound) {
      const address = new Address();
      addressFound.addresses.push(changes.address);
      address.addresses = addressFound.addresses;
      return await this.addressRepository.addAddress(address);
    } else {
      throw new NotFoundException('addresses not found!')
    }
  }

  async removeAddress(id: number, newAddress: AddAddressDto) {
    const addressFound = await this.addressRepository.findOne(id);
    if (addressFound) {
      const address = new Address();
      addressFound.addresses.filter(address => address !== newAddress.address);
      address.addresses = addressFound.addresses;
      return await this.addressRepository.removeAddress(address);
    } else {
      throw new NotFoundException('addresses not found!')
    }
  }
}