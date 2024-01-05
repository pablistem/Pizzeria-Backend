import { product1, product3 } from './product';

export const option1 = {
  id: 1,
  variant: 'option_1',
  price: 10,
  product: product3.id,
};

export const option2 = {
  id: 2,
  variant: 'option_2',
  price: 10,
  product: product1.id,
};

export const optionFixtures = [option1, option2];
