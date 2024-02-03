import { Address } from "../../domain/address.entity";

export interface IAddressRepository {
  findOne(id: number): Promise<Address>;
  create(data: Address): Promise<Address>
  addAddress(data: Address): Promise<Address>;
  removeAddress(changes: Address): Promise<Address>;
}