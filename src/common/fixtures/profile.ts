import { Profile } from './../../module/profile/domain/profile.entity';

export const profile1: Profile = {
  id: 1,
  phone: 26100000,
  address: 'Av. San Martin',
  userId: 1,
};

export const profile2: Profile = {
  id: 2,
  phone: 26100001,
  address: 'Calle Avellaneda',
  userId: 2,
};

export const profileFixtures = [profile1, profile2];
