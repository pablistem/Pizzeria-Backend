import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Option } from '../domain/option.entity';
import { IOptionRepository } from '../repository/option.repository.entity';
import { OptionRepository } from '../infrastucture/option.respositoy';
import { ICreateOption, IUpdateOption } from '../interfaces/option.service';

@Injectable()
export class OptionService {
  constructor(
    @Inject(OptionRepository)
    private readonly optionRepository: IOptionRepository,
  ) {}

  async create(option: ICreateOption): Promise<HttpException | Option> {
    try {
      return await this.optionRepository.save(option);
    } catch (error) {
      throw new BadRequestException('All the fields must be filled out');
    }
  }

  async getOne(id: number): Promise<Option> {
    const optionFound = await this.optionRepository.findOne(id);
    if (!optionFound) {
      throw new HttpException('Option Not Found', 404);
    }
    return optionFound;
  }

  async getAllOptions() {
    return this.optionRepository.getAll();
  }

  async updateOption(
    updateOptionDto: IUpdateOption,
    id: number,
  ): Promise<Option> {
    const optionFound = await this.optionRepository.findOne(id);
    if (!optionFound) {
      throw new NotFoundException('Option not found');
    } else {
      return this.optionRepository.update(updateOptionDto);
    }
  }

  async removeOption(id: number) {
    const optionFound = await this.optionRepository.findOne(id);
    if (!optionFound) {
      throw new NotFoundException('Option not Found!');
    } else {
      return await this.optionRepository.delete(optionFound.id);
    }
  }
}
