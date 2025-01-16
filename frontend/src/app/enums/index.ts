export enum PublishStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum ActiveStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}


export enum NotificationType {
  SYSTEM = "SYSTEM",
  USER = "USER",
}

export enum SettingsType {
    DASHBOARD = "DASHBOARD",
    LANDING =   "LANDING",
    COMPANY_INFO  = "COMPANY_INFO",
  }

export enum WalletType {
  FIAT = "FIAT",
  CRYPTO = "CRYPTO",
  CREDIT = "CREDIT",
  TOKEN = "TOKEN",
}

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DISABLED = "DISABLED",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum ViewState {
  READ = "READ",
  UNREAD = "UNREAD",
  REMOVED = "REMOVED",
  DELETED = "DELETED",
}

export enum ProfileStatus {
  DISABLED = "DISABLED",
  BANNED = "BANNED",
  DEACTIVATED = "DEACTIVATED",
  PAUSED = "PAUSED",
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}

export enum ListingStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  DELETED = "DELETED",
  TRASHED = "TRASHED",
  LISTED = "LISTED",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
}

export enum Platform {
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  TIKTOK = "TIKTOK",
  YOUTUBE = "YOUTUBE",
  OTHER = "OTHER",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
}

export enum SubscriptionType {
  PLAN = "PLAN",
  TOPUP = "TOPUP",
}

export enum PaymentFrequency {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  ONE_TIME = "ONE_TIME",
}

export enum PlanType {
  PAID = "PAID",
  FREE = "FREE",
  TRIAL = "TRIAL",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  PAID = "PAID",
  UNPAID = "UNPAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
}

export enum OrderStatus {
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
}

export enum TransactionPurpose {
  PLAN = "PLAN",
  TOPUP = "TOPUP",
  PURCHASE = "PURCHASE",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  CRYPTO = "CRYPTO",
  CREDIT = "CREDIT",
  TOKEN = "TOKEN",
}

export enum GatewayMode {
  LIVE = "LIVE",
  SANDBOX = "SANDBOX",
}

export enum AttachmentForEnum {
  MESSAGE = "MESSAGE",
  ROOMMESSAGE = "ROOMMESSAGE",
  POST = "POST",
  COMMENT = "COMMENT",
  TICKETS = "TICKETS",
  MAILER = "MAILER",
  LISTING = "LISTING",
  SERVICE = "SERVICE",
  NOTIFICATION = "NOTIFICATION",
}

export enum CategoryForEnum {
  POST = "POST",
  LISTING = "LISTING",
  
}

export enum VerificationStatus {
  PENDING  = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export enum DocumentType {
  ID = "ID",
  BUSINESS_LICENSE = "BUSINESS_LICENSE",
  DRIVER_LICENSE = "DRIVER_LICENSE",
  UTILITY_BILL = "UTILITY_BILL",
  TAX_CERTIFICATE = "TAX_CERTIFICATE",
  OTHER = "OTHER",
}

export enum CategoryIconType {
  ICON = "ICON",
  SVG = "SVG",
  IMAGE = "IMAGE",
}

export enum RolesEnum {
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
  DEV = "DEV",
}


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


export enum TicketCategory {
  BILLING = "BILLING",
  TECHNICAL = "TECHNICAL",
  GENERAL = "GENERAL",
  ACCOUNT = "ACCOUNT",
}

export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum TicketStatus {
  OPEN = "OPEN",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}
