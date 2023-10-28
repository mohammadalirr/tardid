import { BaseEntity } from './Base'

export interface ActivityAreaEntity extends BaseEntity {
  title: any;
  description: any;
  image: string;
  active: boolean;
}

export type ActivityAreaAttributes = Omit<
ActivityAreaEntity,
  'id' | 'createdAt' | 'updatedAt'
>