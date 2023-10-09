import { Option } from '../domain/option.entity';
import { ICreateOpntion, IUpdateOption } from '../interfaces/option.service';

export interface IOptionRepository {
  save(option: ICreateOpntion): Promise<Option>;
  findOne(id: number): Promise<Option | null>;
  delete(optionId: number): Promise<void>;
  getAll(): Promise<Option[]>;
  update(option: IUpdateOption): Promise<Option>;
}
