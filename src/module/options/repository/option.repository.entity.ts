import { Option } from '../domain/option.entity';

export interface IOptionRepository {
  save(option: Option): Promise<Option>;
  findOne(id: number): Promise<Option | null>;
  delete(optionId: number): Promise<void>;
  getAll(): Promise<Option[]>;
  update(option: Option): Promise<Option>;
}
