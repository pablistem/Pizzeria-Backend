import { Profile } from '../../domain/profile.entity';

export const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

export interface IProfileRepository {
  findOne(id: number): Promise<Profile | null>;
  findAll(): Promise<Profile[]>;
  updateProfile(changes: Profile): Promise<Profile | null>;
  createProfile(newProfile: Profile): Promise<Profile>;
}
