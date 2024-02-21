import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IProfileRepository } from '../application/repository/profile.repository.interface';
import { Profile } from '../domain/profile.entity';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  repository: Repository<Profile>;

  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(Profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.repository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .getMany();
  }

  async findOne(id: number): Promise<Profile | null> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
      relations: { 
        user: true,
      },
    });
  }

  async createProfile(newProfile: Profile): Promise<void> {
    const profileNew = this.repository.create(newProfile);
    this.repository.save(profileNew);
  }

  async updateProfile(changes: Profile): Promise<Profile | null> {
    return this.repository.save(changes);
  }
}
