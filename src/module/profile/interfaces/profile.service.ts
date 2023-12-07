export interface ICreateProfile {
  id: number;
  phone: number;
  address: string;
  user: number;
}

export interface IUpdateProfile {
  id: number;
  phone?: number;
  address?: string;
  user?: number;
}
