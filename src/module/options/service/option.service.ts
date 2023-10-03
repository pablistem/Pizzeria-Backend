import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Option } from '../domain/option.entity';
import { IOptionRepository } from '../repository/option.repository.entity';
import { OptionRepository } from '../infrastucture/option.respositoy';
import { RoleEnum } from 'src/module/user/domain/user.entity';
import { UserService } from 'src/module/user/application/service/user.service';

@Injectable()
export class OptionService {
  constructor(
    @Inject(OptionRepository)
    private readonly optionRepository: IOptionRepository,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(option: Option): Promise<HttpException | Option> {
    return await this.optionRepository.save(option);
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

  async updateOption(updateOptionDto: Option, id: number): Promise<Option> {
    const optionFound = await this.optionRepository.findOne(id);
    if (!optionFound) {
      throw new NotFoundException('Option not found');
    } else {
      return this.optionRepository.update(updateOptionDto);
    }
  }

  async remove(userId: number, optionId: number) {
    const user = await this.userService.findUserById(userId);
    if (user.role === RoleEnum.admin) {
      try {
        await this.optionRepository.delete(optionId);
        return { message: 'Entity delete complete' };
      } catch (err) {
        throw new NotFoundException('Option not found');
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
