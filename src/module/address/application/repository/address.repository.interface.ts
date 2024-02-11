import { Address } from "../../domain/address.entity";
import { ICreateAddress, IUpdateAddress } from "../../interface/address.interface";

export const ADDRESS_REPOSITORY = "ADDRESS_REPOSITORY"

export interface IAddressRepository {
  findOne(id: number): Promise<Address>;
  create(data: ICreateAddress): Promise<Address>;
  update(changes: IUpdateAddress): Promise<Partial<Address>>;
  delete(id: number): Promise<void>;
}