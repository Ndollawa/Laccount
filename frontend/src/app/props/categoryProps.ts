import { ActiveStatus, CategoryForEnum } from "../enums";

export default interface CategoryProps{
    status: ActiveStatus;
    name: string;
    id?: string;
    icon?: string | null;
    iconType?: string | null;
    parentId: string | null;
    for: CategoryForEnum;
    createdAt?:Date;
    updatedAt?:Date;
}