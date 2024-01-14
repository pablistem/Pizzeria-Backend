import { order1, order2 } from './order';
import { product1, product2, product3 } from './product';
import { ItemFixture } from './types.fixture';

export const item1: ItemFixture = {
  id: 1,
  quantity: 1,
  discount: 0,
  subTotal: 0,
  order: order1.id,
  product: product1.id,
};

export const item2: ItemFixture = {
  id: 2,
  quantity: 1,
  discount: 0,
  subTotal: 0,
  order: order2.id,
  product: product2.id,
};

export const item3: ItemFixture = {
  id: 3,
  quantity: 1,
  discount: 0,
  subTotal: 0,
  order: order2.id,
  product: product3.id,
};

export const itemFixtures = [item1, item2, item3];
