import { Profile } from "../../domain/profile.entity";
import { ICreateProfile, IUpdateProfile } from "../../interface/profile.entity";

export const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

export interface IProfileRepository {
    findOne(id: number): Promise<Profile | null>,
    findAll(): Promise<Profile[]>,
    updateProfile(changes: IUpdateProfile): Promise<Profile | null>,
    createProfile(newProfile: ICreateProfile): Promise<void>
};