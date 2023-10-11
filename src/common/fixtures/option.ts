import { Option } from 'src/module/option/domain/option.entity';
import { product1 } from './product';

export const option1: Option = {
  id: 1,
  variant: 'option_1',
  price: 10,
  product: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const option2: Option = {
  id: 2,
  variant: 'option_2',
  price: 10,
  product: product1,
  createdAt: undefined,
  updatedAt: undefined,
};
