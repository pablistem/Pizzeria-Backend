import { RoleEnum } from '../../module/user/domain/user.entity';

export interface UserRequest extends Express.Request {
  user: UserToken;
}

export interface UserToken {
  id: number;
  email: string;
  role: RoleEnum;
}
