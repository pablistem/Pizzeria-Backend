import { Address } from "../../domain/address.entity";

export const ADDRESS_REPOSITORY = "ADDRESS_REPOSITORY"

export interface IAddressRepository {
  findOne(id: number): Promise<Address>;
  create(data: Address): Promise<Address>;
  update(changes: Partial<Address>): Promise<Address>;
  delete(id: number): Promise<void>;
}