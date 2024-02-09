import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Address } from "../domain/address.entity";
import { IAddressRepository } from "../application/repository/address.repository.interface";
import { ICreateAddress, IUpdateAddress } from "../interface/address.interface";

@Injectable()
export class AddressRepository implements IAddressRepository {
  repository: Repository<Address>
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Address)
  }

  async findOne(id: number): Promise<Address> {
    return await this.repository.findOne({
      where: { id: id },
      relations: {
        profile: true
      }
    })
  }

  async create(data: ICreateAddress): Promise<Address> {
    const newAddressesArray = this.repository.create(data);
    return await this.repository.save(newAddressesArray);
  }

  async update(changes: IUpdateAddress): Promise<Partial<Address>> {
    return await this.repository.save(changes);
  }

  async delete(id: number): Promise<void> {
    const addressFound = await this.repository.findOne({
      where: { id: id }
    });
    await this.repository.remove(addressFound);
  }
}