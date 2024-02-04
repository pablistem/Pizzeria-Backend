import { AddressFixture } from "./types.fixture";

export const address1: AddressFixture = {
  id: 1,
  addresses: ['Av. Callao 123', 'San Martín 555', 'Buenos Aires 111'],
  country: 'Argentina',
  state: 'Mendoza',
  city: 'San Rafael',
}

export const address2: AddressFixture = {
  id: 2,
  addresses: ['Av. Callao 456', 'San Martín 777', 'Buenos Aires 222'],
  country: 'Argentina',
  state: 'Buenos Aires',
  city: 'Villa Gesel',
}

export const addressFixture = [address1, address2];