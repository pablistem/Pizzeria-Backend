import { ProfileFixture } from './types.fixture';
import { adminUser, anonUser, normalUser } from './user';

export const anonProfile: ProfileFixture = {
  id: 1,
  avatar: 'image',
  name: 'anon',
  lastName: 'anon',
  age: 30,
  phone: 2610000001,
  user: anonUser.id,
};

export const normalProfile: ProfileFixture = {
  id: 2,
  avatar: 'image',
  name: 'normal',
  lastName: 'normal',
  age: 30,
  phone: 2610000002,
  user: normalUser.id,
};

export const adminProfile: ProfileFixture = {
  id: 3,
  avatar: 'image',
  name: 'admin',
  lastName: 'admin',
  age: 30,
  phone: 2610000003,
  user: adminUser.id,
};

export const profileFixtures = [anonProfile, normalProfile, adminProfile];
