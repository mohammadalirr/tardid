import { AnyObject } from 'yup';
import { BaseEntity } from './Base'

export interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type RegisterAttributes = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string | undefined;
  storeName: string;
  displayName: string;
  currency: string;
  contactNumber: string;
  // logo: any;
  address: string;
  description?: string;
}

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export const defaultUserData = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  createdAt: null,
  updatedAt: null,
}
