import { category1, category2, category3 } from './category';

export const product1 = {
  id: 1,
  title: 'product_1',
  description: 'product_1',
  image: 'img_1',
  category: category1.id,
  price: 200,
  stock: 20,
};

export const product2 = {
  id: 2,
  title: 'product_2',
  description: 'product_2',
  image: 'image',
  category: category2.id,
  price: 10,
  stock: 10,
};

export const product3 = {
  id: 3,
  title: 'product_3',
  description: 'product_3',
  image: 'image',
  category: category3.id,
  price: 10,
  stock: 10,
};

export const productFixtures = [product1, product2, product3];
