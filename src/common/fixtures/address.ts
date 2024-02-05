import { AddressFixture } from "./types.fixture";

export const address1: AddressFixture = {
  id: 1,
  address: 'Av. Callao 123',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'San Rafael',
}

export const address2: AddressFixture = {
  id: 2,
  address: 'Av. Callao 456',
  country: 'Argentina',
  state: 'Buenos Aires',
  city: 'Villa Gesel',
}

export const addressFixture = [address1, address2];