import { OrderStatus } from 'src/module/item/domain/item.entity';
import { Order } from 'src/module/order/domain/order.entity';
import { normalUser } from './user';
import { item1, item2 } from './item';
import { option1, option2 } from './option';

export const order1: Order = {
  id: 1,
  status: OrderStatus.pending,
  user: normalUser,
  items: [item1, item2],
  createdAt: undefined,
  updatedAt: undefined,
  total: 0,
  options: [option1],
};
export const order2: Order = {
  id: 2,
  status: OrderStatus.delivered,
  user: normalUser,
  items: [],
  createdAt: undefined,
  updatedAt: undefined,
  total: 0,
  options: [option2],
};

export const orderFixtures = [order1, order2];
