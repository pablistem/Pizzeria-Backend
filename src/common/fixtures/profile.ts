import { Profile } from './../../module/profile/domain/profile.entity';
import { adminUser, normalUser } from './user';

export const profile1: Profile = {
  id: 1,
  phone: 26100000,
  address: 'Av. San Martin',
  userId: normalUser,
};

export const profile2: Profile = {
  id: 2,
  phone: 26100001,
  address: 'Calle Avellaneda',
  userId: adminUser,
};
