import { OrderStatus } from '../../../src/module/item/domain/item.entity';
import { normalUser } from './user';

export const order1 = {
  id: 1,
  status: OrderStatus.pending,
  user: normalUser.id,
  total: 0,
};
export const order2 = {
  id: 2,
  status: OrderStatus.delivered,
  user: normalUser.id,
  total: 0,
};

export const orderFixtures = [order1, order2];
