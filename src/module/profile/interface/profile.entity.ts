import { User } from "src/module/user/domain/user.entity"

export interface ICreateProfile {
    avatar: string
    street: string
    height: number
    postalCode: number
    age: number
    user: User
};

export interface IUpdateProfile {
    id: number
    avatar?: string
    street?: string
    height?: number
    postalCode?: number
    age?: number
    user?: User
};