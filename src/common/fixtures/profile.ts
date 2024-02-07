import { ProfileFixture } from './types.fixture';
import { adminUser, anonUser, normalUser } from './user';

export const anonProfile: ProfileFixture = {
  id: 1,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
  user: anonUser.id,
};

export const normalProfile: ProfileFixture = {
  id: 2,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
  user: normalUser.id,
};

export const adminProfile: ProfileFixture = {
  id: 3,
  avatar: 'imagen',
  street: 'calle x',
  height: 1234,
  postalCode: 5000,
  age: 30,
  user: adminUser.id,
};

export const profileFixtures = [anonProfile, normalProfile, adminProfile];
