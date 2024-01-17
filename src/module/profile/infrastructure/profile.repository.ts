import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IProfileRepository } from '../application/repository/profile.repository.interface';
import { Profile } from '../domain/profile.entity';
import { ICreateProfile, IUpdateProfile } from '../interface/profile.entity';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  repository: Repository<Profile>;

  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(Profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Profile | null> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createProfile(newProfile: ICreateProfile): Promise<void> {
    const profileNew = this.repository.create(newProfile);
    this.repository.save(profileNew);
  }

  async updateProfile(changes: IUpdateProfile): Promise<Profile | null> {
    return this.repository.save(changes);
  }
}
