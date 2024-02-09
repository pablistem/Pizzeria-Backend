import { address1, address2, address3, address4, address5, address6 } from './address';
import { category1, category2, category3 } from './category';
import { item1, item2, item3 } from './item';
import { option1, option2 } from './option';
import { order1, order2 } from './order';
import { product1, product2, product3 } from './product';
import { adminProfile, anonProfile, normalProfile } from './profile';
import { FixturesTree } from './types.fixture';
import { adminUser, anonUser, normalUser, userByProfile } from './user';

export const fixturesTree: FixturesTree = {
  User: [normalUser, adminUser, anonUser, userByProfile],
  Category: [category1, category2, category3],
  Product: [product1, product2, product3],
  Option: [option1, option2],
  Order: [order1, order2],
  Item: [item1, item2, item3],
  Address: [address1, address2, address3, address4, address5, address6],
  Profile: [adminProfile, anonProfile, normalProfile],
};
