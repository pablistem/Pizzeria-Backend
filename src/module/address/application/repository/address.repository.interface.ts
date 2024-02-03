import { Address } from "../../domain/address.entity";
import { ICreateAddress, IUpdateAddress } from "../../interface/address.interface";

export interface IAddressRepository {
  findOne(id: number): Promise<Address>;
  create(data: Address): Promise<Address>
  addAddress(data: Address): Promise<Address>;
  removeAddress(changes: Address): Promise<Address>;
}