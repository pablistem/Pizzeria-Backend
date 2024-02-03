export interface ICreateAddress {
  address: string[],
  createdDate: Date;
  updatedDate: Date;
}

export interface IUpdateAddress {
  id: number;
  address?: string[];
  updatedDate: Date;
}