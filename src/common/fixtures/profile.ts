import { ProfileFixture } from './types.fixture';

export const anonProfile: ProfileFixture = {
  id: 1,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
};

export const normalProfile: ProfileFixture = {
  id: 2,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
};

export const adminProfile: ProfileFixture = {
  id: 3,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
};

export const profileFixtures = [anonProfile, normalProfile, adminProfile];
