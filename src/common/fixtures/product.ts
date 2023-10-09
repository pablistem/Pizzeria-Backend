import { Product } from 'src/module/product/domain/product.entity';
import { category1, category2, category3 } from './category';
import { option1, option2 } from './option';

export const product1: Product = {
  id: 1,
  title: 'product_1',
  description: 'product_1',
  image: 'img_1',
  category: category1.name,
  price: 200,
  stock: 20,
  options: [option1, option2],
  createdAt: undefined,
  updatedAt: undefined,
};

export const product2: Product = {
  id: 2,
  title: 'product_2',
  description: 'product_2',
  image: 'image',
  category: category2.name,
  price: 10,
  stock: 10,
  options: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const product3: Product = {
  id: 3,
  title: 'product_3',
  description: 'product_3',
  image: 'image',
  category: category3.name,
  price: 10,
  stock: 10,
  options: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const productFixtures = [product1, product2, product3];
