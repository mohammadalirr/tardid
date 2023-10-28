import { BaseEntity } from './Base'

export interface LanguageEntity extends BaseEntity {
  data: any;
  locale: any;
  active: boolean;
}

export type LanguageAttributes = Omit<
LanguageEntity,
  'id' | 'createdAt' | 'updatedAt'
>