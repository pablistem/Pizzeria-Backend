import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IProfileRepository } from '../application/repository/profile.repository.interface';
import { Profile } from '../domain/profile.entity';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  repository: Repository<Profile>;

  constructor(datasource: DataSource) {
    this.repository = datasource.getRepository(Profile);
  }

  async findById(id: number): Promise<Profile | null> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUser(user: number): Promise<Profile | null> {
    return await this.repository.findOne({
      where: {
        user: user,
      },
      relations: { 
        user: true,
      },
    });
  }

  async createProfile(data: Profile): Promise<Profile> {
    const profileNew = this.repository.create(data);
    return await this.repository.save(profileNew);
  }

  async updateProfile(changes: Profile): Promise<Profile | null> {
    return this.repository.save(changes);
  }
}
