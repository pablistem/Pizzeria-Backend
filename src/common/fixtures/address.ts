import { adminProfile, anonProfile, normalProfile } from "./profile";
import { AddressFixture } from "./types.fixture";

export const address1: AddressFixture = {
  id: 1,
  address: 'Av. Callao 123',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'San Rafael',
  profile: adminProfile.id
}

export const address2: AddressFixture = {
  id: 2,
  address: 'Av. Callao 456',
  country: 'Argentina',
  state: 'Buenos Aires',
  city: 'Villa Gesel',
  profile: adminProfile.id
}

export const address3: AddressFixture = {
  id: 3,
  address: 'Av. Avellaneda 456',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  profile: anonProfile.id,
}

export const address4: AddressFixture = {
  id: 4,
  address: 'Av. Urquiza 456',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  profile: anonProfile.id,
}

export const address5: AddressFixture = {
  id: 5,
  address: 'Av. Urquiza 456',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  profile: normalProfile.id,
}

export const address6: AddressFixture = {
  id: 6,
  address: 'Av. Urquiza 456',
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  profile: normalProfile.id,
}

export const addressFixtures = [address1, address2, address3, address4, address5, address6];