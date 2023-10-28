import { BaseEntity } from './Base'

export interface ProductEntity extends BaseEntity {
  name: any;
  description: any;
  images: string[];
  characteristics: any;
  faq: any;
  active: boolean;
}

export type ProductAttributes = Omit<
ProductEntity,
  'id' | 'createdAt' | 'updatedAt'
>