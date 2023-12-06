import { User } from 'src/module/user/domain/user.entity';

export interface ICreateProfile {
  id: number;
  phone: number;
  address: string;
  user: User;
}

export interface IUpdateProfile {
  id: number;
  phone?: number;
  address?: string;
  user?: User;
}
