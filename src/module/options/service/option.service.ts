import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Option } from '../domain/option.entity';

@Injectable()
export class OptionService {
  constructor() // Inject repository
  {}

  async create(option: Option): Promise<HttpException | Option> {
    // return await this.optionRepository.save(option);
  }

  async getOne(id: number): Promise<Option> {
    // const optionFound = await this.optionRepository.findOne(id);
  }

  async updateOption(updateOptionDto: Option, id: number): Promise<Option> {
    // const optionFound = await this.optionRepository.findOne(id);
  }

  async remove(id: number) {
    // const optionFound = await this.optionRepository.findOne(id)
  }
}
