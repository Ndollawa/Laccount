export enum MailerTemplateEnum {
    SIGNUP_CONFIRMATION = "SIGNUP_CONFIRMATION",
    LOGIN_CONFIRMATION = "LOGIN_CONFIRMATION",
    PASSWORD_RESET = "PASSWORD_RESET",
    ACCOUNT_VERIFICATION = "ACCOUNT_VERIFICATION",
    PAYMENT_RECEIPT = "PAYMENT_RECEIPT",
    SUBSCRIPTION_RENEWAL = "SUBSCRIPTION_RENEWAL",
    NEWSLETTER = "NEWSLETTER",
    SYSTEM_NOTIFICATION = "SYSTEM_NOTIFICATION",
    PROMOTIONAL_OFFER = "PROMOTIONAL_OFFER",
    DEFAULT = "DEFAULT",
  }
  
  export enum MailerTemplateStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }
  

export interface MailerProps{
    id? : string ;
    type : MailerTemplateEnum;
    template : string;
    body     : string;
    name     : string;
    data    :  object;
    status :   MailerTemplateStatus;
    createdAt?: Date;
    updatedAt?: Date;
}