import { adminUser, normalUser } from './user';

export const refreshTokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.0b9BbjpBFg7eEES4jOk6kjjNCYQLWLfM_4RMxNz382k';
export const refreshTokenUser =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6Im5vcm1hbEBlbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9.L60KAcjoA1a6qTNXF2nAdgO9sUNLPmzrpbUPemRTvIc';
export const sessionAdmin = {
  id: 1,
  user: adminUser.id,
  refreshToken: refreshTokenAdmin,
};

export const sessionNormal = {
  id: 2,
  user: normalUser.id,
  refreshToken: refreshTokenUser,
};

export const authFixture = [sessionAdmin, sessionNormal];
