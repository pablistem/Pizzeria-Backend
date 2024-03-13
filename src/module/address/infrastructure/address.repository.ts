import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Address } from "../domain/address.entity";
import { IAddressRepository } from "../application/repository/address.repository.interface";

@Injectable()
export class AddressRepository implements IAddressRepository {
  repository: Repository<Address>
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Address)
  }

  async findMany(user: number): Promise<Address[]> {
    return await this.repository.createQueryBuilder('address')
      .leftJoinAndSelect('address.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.user = :id', { id: user })
      .getMany();
    }

  async findOne(id: number): Promise<Address> {
    return await this.repository.createQueryBuilder('address')
      .leftJoinAndSelect('address.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('address.id = :id', { id: id })
      .getOne()
  }

  async create(data: Address): Promise<Address> {
    const newAddressesArray = this.repository.create(data);
    return await this.repository.save(newAddressesArray);
  }

  async update(changes: Partial<Address>): Promise<Address> {
    return await this.repository.save(changes);
  }

  async delete(id: number): Promise<void> {
    const addressFound = await this.repository.findOne({
      where: { id: id }
    });
    await this.repository.remove(addressFound);
  }
}