import { RoleEnum, User } from '../../domain/user.entity';
import * as argon2 from 'argon2';
export const getUserTestDb = async () => {
  const adminHash = await argon2.hash('admin_password');
  const adminTestUser = new User(
    'adminUser@email.com',
    'admin',
    'admin',
    adminHash,
    true,
    RoleEnum.admin,
  );

  const userHash = await argon2.hash('user_password');
  const testUser = new User(
    'testUser@email.com',
    'test',
    'test',
    userHash,
    true,
    RoleEnum.user,
  );
  const anonHash = await argon2.hash('anon_password');
  const anonTestUser = new User(
    'anonTestUser@email.com',
    'anon',
    'anon',
    anonHash,
    true,
    RoleEnum.user,
  );
  return [adminTestUser, testUser, anonTestUser];
};
