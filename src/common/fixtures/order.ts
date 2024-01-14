import { OrderStatus } from '../../../src/module/item/domain/item.entity';
import { OrderFixture } from './types.fixture';
import { adminUser, normalUser } from './user';

export const order1: OrderFixture = {
  id: 1,
  status: OrderStatus.pending,
  user: normalUser.id,
  total: 0,
};
export const order2: OrderFixture = {
  id: 2,
  status: OrderStatus.delivered,
  user: normalUser.id,
  total: 0,
};

export const order3: OrderFixture = {
  id: 3,
  status: OrderStatus.delivered,
  user: adminUser.id,
  total: 0,
};

export const orderFixtures = [order1, order2, order3];
