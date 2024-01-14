import { category1, category2, category3 } from './category';
import { ProductFixture } from './types.fixture';

export const product1: ProductFixture = {
  id: 1,
  title: 'product_1',
  description: 'product_1',
  image: 'img_1',
  category: category1.id,
  price: 200,
  stock: 20,
  options: undefined,
};

export const product2: ProductFixture = {
  id: 2,
  title: 'product_2',
  description: 'product_2',
  image: 'image',
  category: category2.id,
  price: 10,
  stock: 10,
  options: undefined,
};

export const product3: ProductFixture = {
  id: 3,
  title: 'product_3',
  description: 'product_3',
  image: 'image',
  category: category3.id,
  price: 10,
  stock: 10,
  options: undefined,
};

export const productFixtures = [product1, product2, product3];
