import { ProfileFixture } from './types.fixture';
import { adminUser, anonUser, normalUser } from './user';
import { address1, address2, address4 } from './address';

export const anonProfile: ProfileFixture = {
  id: 1,
  avatar: 'imagen',
  age: 30,
  phone: 2610000001,
  user: anonUser.id,
};

export const normalProfile: ProfileFixture = {
  id: 2,
  avatar: 'imagen',
  age: 30,
  phone: 261000002,
  user: normalUser.id,
};

export const adminProfile: ProfileFixture = {
  id: 3,
  avatar: 'imagen',
  age: 30,
  phone: 2610000001,
  user: adminUser.id,
};

export const profileFixtures = [anonProfile, normalProfile, adminProfile];
