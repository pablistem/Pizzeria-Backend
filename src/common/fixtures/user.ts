import { RoleEnum } from 'src/module/user/domain/user.entity';
import { UserFixture } from './types.fixture';

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

export const userByProfile: UserFixture = {
  id: 4,
  email: 'userByProfile@email.com',
  name: 'user',
  lastName: 'profile',
  hash: '',
  verified: true,
  role: RoleEnum.user,
  phone: '',
};
const anonUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm9tQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwicHJvZmlsZSI6MX0.H2fgNi94BMWitqwfN4SuFffbzxljwbYdM8dGzAlHj3Y';

const normalUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJub3JtYWxAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJwcm9maWxlIjoyfQ.iEAhVapnmZ3VZWNpyrK-ogoBcPKObi-MWqDltMeZxOo';

const adminUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9maWxlIjozfQ._YB0PBaProPR6VnsILfD6P3_hBF6C0Qv0IpJ-5HKSjc';

const userByProfileToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyQnlQcm9maWxlQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwicHJvZmlsZSI6NH0.MjHYD6WvKY8p2mRV9NFDXW4Thtv5A5_WMdvLS6N6zTI';

export const tokens = {
  anonUserToken,
  normalUserToken,
  adminUserToken,
  userByProfileToken,
};

export const userFixtures = [anonUser, normalUser, adminUser, userByProfile];
