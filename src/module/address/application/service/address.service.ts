import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../../infrastructure/address.repository';
import { IAddressRepository } from '../repository/address.repository.interface';
import { Address } from '../../domain/address.entity';
import { CreateAddressDto, UpdateAddressDto } from '../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY') 
    private readonly addressRepository: IAddressRepository) {}

  async getAddress(id: number) {
    const addressFound = await this.addressRepository.findOne(id)
    if (!addressFound) throw new NotFoundException('addresses not found!')
    return addressFound;
  }

  async getAddressBy(id: number) {
    const addressFound = await this.addressRepository.findOne(id);
    if (!addressFound) {
      throw new NotFoundException('addresses not found!')
    }
    return addressFound;
  }

  async createAddress(data: CreateAddressDto) {
    return await this.addressRepository.create(data);
  }

  async updateAddress(id: number, changes: UpdateAddressDto) {
    const addressFound = await this.getAddressBy(id);
    return await this.addressRepository.update(changes);
  }
}