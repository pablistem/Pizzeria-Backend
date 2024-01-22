import { RoleEnum } from 'src/module/user/domain/user.entity';
import { UserFixture } from './types.fixture';
import { adminProfile, anonProfile, normalProfile } from './profile';

export const anonUser: UserFixture = {
  id: 1,
  email: 'anon@email.com',
  name: 'anon',
  lastName: 'anon',
  hash: '',
  verified: true,
  role: RoleEnum.user,
  phone: '4321',
};

export const normalUser: UserFixture = {
  id: 2,
  email: 'normal@email.com',
  name: 'normal',
  lastName: 'normal',
  hash: '',
  verified: true,
  role: RoleEnum.user,
  phone: '1234',
};

export const adminUser: UserFixture = {
  id: 3,
  email: 'admin@email.com',
  name: 'admin',
  lastName: 'admin',
  hash: '',
  verified: true,
  role: RoleEnum.admin,
  phone: '',
};
const anonUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm9uQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.CtgSSoHXymS8XjDSIc02wDJFQNX_95wmwRlfjEtHKkE';

const normalUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJub3JtYWxAZW1haWwuY29tIiwicm9sZSI6InVzZXIifQ.Q5dhZOg2hztQ5KJdl3mXKb6CNCwz5d-dA4p89MC6_YY';

const adminUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.lDuufJZtGEbvlZmjPBFE_Gfbw_e4034KNDZ305s_SMg';

export const tokens = {
  anonUserToken,
  normalUserToken,
  adminUserToken,
};

export const userFixtures = [anonUser, normalUser, adminUser];
