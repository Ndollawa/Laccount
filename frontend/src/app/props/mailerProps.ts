
import {ActiveStatus, MailerTemplateEnum } from "../enums";

export interface MailTemplateProps{
    id? : string ;
    template : string;
    name     : string;
    status :   ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EMailTemplateProps{
    id? : string ;
    type : MailerTemplateEnum;
    templateId : string;
    body     : string;
    name     : string;
    context    :  object;
    status :   ActiveStatus;
    createdAt?: Date;
    updatedAt?: Date;
}