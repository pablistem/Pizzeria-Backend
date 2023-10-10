import { getUserTestDb } from '../../../../user/infrastructure/__test__/user.test.db';
import { Order } from '../../../../order/domain/order.entity';

export const getUsersWithOrders = async () => {
  const [adminTestUser, testUser, anonTestUser] = await getUserTestDb();

  const order1 = new Order();
  const order2 = new Order();
  const order3 = new Order();
  order1.user = testUser;
  order2.user = testUser;
  order3.user = anonTestUser;
  return {
    users: [adminTestUser, testUser, anonTestUser],
    orders: [order1, order2, order3],
  };
};
