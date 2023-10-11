import { option1, option2 } from './option';
import { order1, order2 } from './order';
import { product1, product2, product3 } from './product';

export const item1 = {
  id: 1,
  quantity: 1,
  discount: 0,
  product: product1,
  order: order1,
  subTotal: 0,
  createdAt: undefined,
  updatedAt: undefined,
  options:[option1]
};

export const item2 = {
  id: 2,
  quantity: 1,
  discount: 0,
  product: product2,
  order: order1,
  subTotal: 0,
  createdAt: undefined,
  updatedAt: undefined,
  options:[option2]
};

export const item3 = {
  id: 3,
  quantity: 1,
  discount: 0,
  product: product3,
  order: order2,
  subTotal: 0,
  createdAt: undefined,
  updatedAt: undefined,
};

export const itemFixtures = [item1, item2, item3];
