import { Product } from 'src/module/product/domain/product.entity';
import { category1, category2, category3 } from './category';

export const product1: Product = {
  id: 1,
  title: 'product_1',
  description: 'product_1',
  image: 'img_1',
  category: category1,
  price: 200,
  stock: 20,
  options: 'options',
  createdAt: undefined,
  updatedAt: undefined,
};

export const product2: Product = {
  id: 2,
  title: 'product_2',
  description: 'product_2',
  image: 'image',
  category: category2,
  price: 10,
  stock: 10,
  options: 'options',
  createdAt: undefined,
  updatedAt: undefined,
};

export const product3: Product = {
  id: 3,
  title: 'product_3',
  description: 'product_3',
  image: 'image',
  category: category3,
  price: 10,
  stock: 10,
  options: 'options',
  createdAt: undefined,
  updatedAt: undefined,
};

export const productFixtures = [product1, product2, product3];
