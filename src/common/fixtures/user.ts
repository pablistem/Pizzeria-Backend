import { RoleEnum } from 'src/module/user/domain/user.entity';
import { UserFixture } from './types.fixture';

export const anonUser: UserFixture = {
  id: 1,
  email: 'anon@email.com',
  hash: '',
  verified: true,
  role: RoleEnum.user,
};

export const normalUser: UserFixture = {
  id: 2,
  email: 'normal@email.com',
  hash: '',
  verified: true,
  role: RoleEnum.user,
};

export const adminUser: UserFixture = {
  id: 3,
  email: 'admin@email.com',
  hash: '',
  verified: true,
  role: RoleEnum.admin,
};

export const userByProfile: UserFixture = {
  id: 4,
  email: 'userByProfile@email.com',
  hash: '',
  verified: true,
  role: RoleEnum.user,
};

const anonUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm9uQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5NjEyMzQ5fQ.9lB9Eii72Rt0NB9ZhGiG5SP5Rw0Hp_eM9I5odY7UbQY';

const normalUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJub3JtYWxAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDk2MTI1MjN9.qhN5RwF1UunVvO5Otu7FItTEQUh6jX9lCXTdXsG9SEA';

const adminUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk2MTI5NTF9.ODzIKeqx0xFssvBBi6C3d4NcalAczQRg7BevvnLSj-Y';

const newUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJuZXd1c2VyQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5OTU2MjQ2fQ.6BfdIZAuk9X5hRXX44613KOSBZkq8K5Ab5FOINNadgY';

export const tokens = {
  anonUserToken,
  normalUserToken,
  adminUserToken,
  newUserToken,
};

export const userFixtures = [anonUser, normalUser, adminUser, userByProfile];
