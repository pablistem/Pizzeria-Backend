import { RoleEnum } from 'src/module/user/domain/user.entity';
import { CategoryFixture, ProductFixture, UserFixture } from './types.fixture';

export const categoryDemo1: CategoryFixture = {
  id: 1,
  name: 'Bebidas',
};

export const categoryDemo2: CategoryFixture = {
  id: 2,
  name: 'Pizzas',
};

export const categoryDemo3: CategoryFixture = {
  id: 3,
  name: 'Empanadas',
};

export const categoryDemo4: CategoryFixture = {
  id: 4,
  name: 'Postres Helados',
};

export const productDemo1: ProductFixture = {
  id: 1,
  title: 'Coca Cola',
  description: 'Refrescante bebida de cola',
  image: 'https://i.imgur.com/Tn6amZZ.png',
  category: categoryDemo1.id,
  price: 1600,
  stock: 20,
  options: undefined,
};
export const productDemo2: ProductFixture = {
  id: 2,
  title: 'Pizza con Jamón y Morrón',
  description: 'Deliciosa pizza con jamón y morrón',
  image: 'https://i.imgur.com/fVrzQVz.jpg',
  category: categoryDemo2.id,
  price: 2000,
  stock: 20,
  options: undefined,
};
export const productDemo3: ProductFixture = {
  id: 3,
  title: 'Empanadas de Pollo',
  description: 'Sabrosas empanadas rellenas de pollo',
  image: 'https://i.imgur.com/0JpS0aP.jpg',
  category: categoryDemo3.id,
  price: 3000,
  stock: 20,
  options: undefined,
};
export const productDemo4: ProductFixture = {
  id: 4,
  title: 'Postre Helado Almendrado',
  description: 'Delicioso postre helado con almendras',
  image: 'https://i.imgur.com/9ihh6WR.jpg',
  category: categoryDemo4.id,
  price: 1900,
  stock: 20,
  options: undefined,
};

export const userAdminDemo: UserFixture = {
  id: 1,
  name: 'Pablo',
  lastName: 'Medina',
  email: 'pablo.medina@email.com',
  hash: '$argon2id$v=19$m=65536,t=3,p=4$bfYxbFLMlMEl5iTN8uazBA$s3Pky6Xm8xi973SdXIqapD38Ws+FUi9Fdt2lGq9o5yU',
  verified: true,
  role: RoleEnum.admin,
};
