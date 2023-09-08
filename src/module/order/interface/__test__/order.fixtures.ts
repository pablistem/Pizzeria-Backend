import { RoleEnum } from '../../../user/domain/user.entity';
import { Order } from '../../domain/order.entity';
const order1 = {
  id: undefined,
  status: 'pending',
  total: 0,
  user: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};
const order2 = {
  id: undefined,
  status: 'pending',
  total: 0,
  user: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

const anonUser = {
  id: 1,
  email: 'anon@email.com',
  name: 'anon',
  lastName: 'anon',
  hash: '',
  verified: true,
  role: RoleEnum.user,
  sessions: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

const normalUser = {
  id: 2,
  email: 'normal@email.com',
  name: 'normal',
  lastName: 'normal',
  hash: '',
  verified: true,
  role: RoleEnum.user,
  sessions: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const userFixtures = [anonUser, normalUser];
order1.user = anonUser;
order2.user = normalUser;
export const orderFixtures = [order1, order2];
