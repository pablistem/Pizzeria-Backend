import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Option } from '../domain/option.entity';
import { IOptionRepository } from '../repository/option.repository.entity';

@Injectable()
export class OptionRepository implements IOptionRepository {
  repository: Repository<Option>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Option);
  }

  async save(option: Option): Promise<Option> {
    const createOption = this.repository.create(option);
    return await this.repository.save(createOption);
  }

  async findOne(id: number): Promise<Option> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async delete(optionId: number): Promise<void> {
    const optionFound = await this.repository.findOne({
      where: { id: optionId },
      relations: [Option.name.toLocaleLowerCase()],
    });
    await this.repository.remove(optionFound);
  }

  getAll(): Promise<Option[]> {
    return this.repository.find();
  }

  update(option: Option): Promise<Option> {
    return this.repository.save(option);
  }
}