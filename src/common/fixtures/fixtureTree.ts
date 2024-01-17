import { category1, category2, category3 } from './category';
import { item1, item2, item3 } from './item';
import { option1, option2 } from './option';
import { order1, order2 } from './order';
import { product1, product2, product3 } from './product';
import { adminProfile, anonProfile, normalProfile } from './profile';
import { FixturesTree } from './types.fixture';
import { adminUser, anonUser, normalUser } from './user';

export const fixturesTree: FixturesTree = {
  User: [normalUser, adminUser, anonUser],
  Category: [category1, category2, category3],
  Product: [product1, product2, product3],
  Option: [option1, option2],
  Order: [order1, order2],
  Item: [item1, item2, item3],
  Profile: [anonProfile, normalProfile, adminProfile]
};
