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

  async findByUser(user: number): Promise<Profile | null> {
    return await this.repository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('profile.addresses', 'address')
      .where('profile.user = :id', { id: user })
      .getOne();
  }

  async createProfile(data: Profile): Promise<Profile> {
    const newProfile = this.repository.create(data);
    return await this.repository.save(newProfile);
  }

  async updateProfile(changes: Profile): Promise<Profile | null> {
    return this.repository.save(changes);
  }
}
