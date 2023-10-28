import { BaseEntity } from './Base'

export interface SubCompanyEntity extends BaseEntity {
  name: any;
  activityTitle: any;
  description: any;
  images: string[];
  website: string;
  logo: string;
  active: boolean;
}

export type SubCompanyAttributes = Omit<
SubCompanyEntity,
  'id' | 'createdAt' | 'updatedAt'
>