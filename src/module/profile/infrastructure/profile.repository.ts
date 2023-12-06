import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Profile } from '../domain/profile.entity';
import { IProfileRepository } from '../repository/profile.repository.entity';
import { ICreateProfile, IUpdateProfile } from '../interfaces/profile.service';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  repository: Repository<Profile>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Profile);
  }

  async save(profile: ICreateProfile): Promise<Profile> {
    const saveProfile = this.repository.create(profile);
    return await this.repository.save(saveProfile);
  }

  async findOne(id: number): Promise<Profile> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async update(profile: IUpdateProfile): Promise<Profile> {
    return this.repository.save(profile);
  }

  async delete(id: number): Promise<void> {
    const profileFound = await this.repository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    await this.repository.delete(profileFound);
  }
}
