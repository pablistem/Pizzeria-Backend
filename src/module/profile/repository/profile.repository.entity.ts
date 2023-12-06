import { Profile } from '../domain/profile.entity';
import { ICreateProfile, IUpdateProfile } from '../interfaces/profile.service';

export interface IProfileRepository {
  save(profile: ICreateProfile): Promise<Profile>;
  findOne(id: number): Promise<Profile | null>;
  delete(profileId: number): Promise<void>;
  update(profile: IUpdateProfile): Promise<Profile>;
}
