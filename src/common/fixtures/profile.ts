import { ProfileFixture } from './types.fixture';
import { adminUser, anonUser, normalUser } from './user';

export const anonProfile: ProfileFixture = {
  id: 1,
  avatar: 'imagen',
  name: 'anon',
  lastName: 'anon',
  age: 30,
  phone: 2610000001,
  user: anonUser.id,
};

export const normalProfile: ProfileFixture = {
  id: 2,
  avatar: 'imagen',
  name: 'normal',
  lastName: 'normal',
  age: 30,
  phone: 2610000002,
  user: normalUser.id,
};

export const adminProfile: ProfileFixture = {
  id: 3,
  avatar: 'imagen',
  name: 'admin',
  lastName: 'admin',
  age: 30,
  phone: 2610000003,
  user: adminUser.id,
};

export const profileFixtures = [anonProfile, normalProfile, adminProfile];
