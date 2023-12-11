import { Auth } from 'src/module/auth/domain/auth.entity';
import { adminUser, normalUser } from './user';

export const refreshTokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.0b9BbjpBFg7eEES4jOk6kjjNCYQLWLfM_4RMxNz382k';
export const refreshTokenUser =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6Im5vcm1hbEBlbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9.L60KAcjoA1a6qTNXF2nAdgO9sUNLPmzrpbUPemRTvIc';
export const sessionAdmin: Auth = {
  id: 1,
  createdAt: undefined,
  updatedAt: undefined,
  user: adminUser,
  refreshToken: refreshTokenAdmin,
};

export const sessionNormal: Auth = {
  id: 2,
  createdAt: undefined,
  updatedAt: undefined,
  user: normalUser,
  refreshToken: refreshTokenUser,
};

export const authFixture = [sessionAdmin, sessionNormal];
