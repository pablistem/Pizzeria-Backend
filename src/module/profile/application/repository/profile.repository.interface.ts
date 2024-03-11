import { Profile } from '../../domain/profile.entity';

export const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

export interface IProfileRepository {
  findByUser(id: number): Promise<Profile | null>;
  updateProfile(changes: Profile): Promise<Profile | null>;
  createProfile(data: Profile): Promise<Profile>;
}
