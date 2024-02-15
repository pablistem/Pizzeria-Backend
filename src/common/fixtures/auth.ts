import { AuthFixture } from './types.fixture';
import { adminUser, normalUser, userByProfile } from './user';

export const refreshTokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.0b9BbjpBFg7eEES4jOk6kjjNCYQLWLfM_4RMxNz382k';
export const refreshTokenUser =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6Im5vcm1hbEBlbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9.L60KAcjoA1a6qTNXF2nAdgO9sUNLPmzrpbUPemRTvIc';
export const refreshTokenUserToErase =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6Im5vcm1hbEBlbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9.L60KAcjoA1a6qTNXF2nAdgO9sUNLPmzrpbUPemRTvIc';
export const refreshTokenProfile =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyQnlQcm9maWxlQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.UDkVfTFVQ1kk2ZXaME71a9BJTgRyUAeGMMA6_qRjah8';

export const sessionAdmin: AuthFixture = {
  id: 1,
  user: adminUser.id,
  refreshToken: refreshTokenAdmin,
};

export const sessionNormal: AuthFixture = {
  id: 2,
  user: normalUser.id,
  refreshToken: refreshTokenUser,
};

export const sessionToErase = {
  id: 3,
  user: normalUser.id,
  refreshToken: refreshTokenUserToErase,
};

export const sessionProfile: AuthFixture = {
  id: 4,
  user: userByProfile.id,
  refreshToken: refreshTokenProfile,
};

export const authFixture = [
  sessionAdmin,
  sessionNormal,
  sessionToErase,
  sessionProfile,
];
