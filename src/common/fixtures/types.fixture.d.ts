import { OmitType } from '@nestjs/swagger';
import { Auth } from 'src/module/auth/domain/auth.entity';
import { Category } from 'src/module/category/application/domain/category.entity';
import { Item } from 'src/module/item/domain/item.entity';
import { Option } from 'src/module/option/domain/option.entity';
import { Order } from 'src/module/order/domain/order.entity';
import { Product } from 'src/module/product/domain/product.entity';
import { User } from 'src/module/user/domain/user.entity';

export class AuthFixture extends OmitType(Auth, [
  'createdAt',
  'updatedAt',
] as const) {
  user: number;
}

export class OrderFixture extends OmitType(Order, [
  'updatedAt',
  'createdAt',
  'items',
] as const) {
  user: number;
}

export class OptionFixture extends OmitType(Option, [
  'updatedAt',
  'createdAt',
] as const) {
  product: number;
}

export class ItemFixture extends OmitType(Item, ['updatedAt', 'createdAt']) {
  order: number;
  product: number;
}

export class CategoryFixture extends OmitType(Category, [
  'products',
  'updatedAt',
  'createdAt',
] as const) {}

export class ProductFixture extends OmitType(Product, [
  'updatedAt',
  'createdAt',
]) {
  category: number;
}

export class UserFixture extends OmitType(User, [
  'updatedAt',
  'createdAt',
  'sessions',
  'orders',
]) {}

interface FixturesTree {
  User: UserFixture[];
  Category: CategoryFixture[];
  Product: ProductFixture[];
  Option: OptionFixture[];
  Order: OrderFixture[];
  Item: ItemFixture[];
}
