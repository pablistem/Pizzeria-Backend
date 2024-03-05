import { adminProfile, anonProfile, normalProfile } from "./profile";
import { AddressFixture } from "./types.fixture";

export const address1: AddressFixture = {
  id: 1,
  country: 'Argentina',
  state: 'Mendoza',
  city: 'San Rafael',
  street: 'Av. Callao',
  height: 123,
  postalCode: 1000,
  profile: adminProfile.id
}

export const address2: AddressFixture = {
  id: 2,
  country: 'Argentina',
  state: 'Buenos Aires',
  city: 'Villa Gesel',
  street: 'Av. Callao',
  height: 456,
  postalCode: 1000,
  profile: adminProfile.id
}

export const address3: AddressFixture = {
  id: 3,
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  street: 'Av. Avellenada',
  height: 400,
  postalCode: 2000,
  profile: anonProfile.id,
}

export const address4: AddressFixture = {
  id: 4,
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  street: 'Av. Avellenada',
  height: 600,
  postalCode: 2000,
  profile: anonProfile.id,
}

export const address5: AddressFixture = {
  id: 5,
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  street: 'Av. Urquiza',
  height: 500,
  postalCode: 3000,
  profile: normalProfile.id,
}

export const address6: AddressFixture = {
  id: 6,
  country: 'Argentina',
  state: 'Mendoza',
  city: 'Maipú',
  street: 'Av. Urquiza',
  height: 700,
  postalCode: 3000,
  profile: normalProfile.id,
}

export const addressFixtures = [address1, address2, address3, address4, address5, address6];