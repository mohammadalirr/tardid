import { ActivityAreaEntity } from "./ActivityArea";
import { LanguageEntity } from "./Language";
import { ProductEntity } from "./Product";
import { SubCompanyEntity } from "./SubCompany";
import { UserEntity } from "./User";

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type Entities = {
    language: LanguageEntity
    activityArea: ActivityAreaEntity
    product: ProductEntity
    user: UserEntity
    subCompany: SubCompanyEntity
}

export type EKeys = keyof Entities;