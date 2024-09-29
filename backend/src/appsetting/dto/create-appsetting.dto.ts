import { SettingsType } from '@prisma/client';
import { IsObject } from 'class-validator';

export class CreateLandingSettingsDto {
  @IsObject()
  landingPageConfig: {
    showBlog: boolean;
    showAffiliate: boolean;
    showTestimonial: boolean;
    navStyle: number;
    sliderStyle: number;
    aboutStyle: number;
    testimonialStyle: number;
    serviceStyle: number;
    ourBenefitStyle: number;
    ourBlogStyle: number;
    whatWeOfferStyle: number;
  };
  @IsObject()
  siteImages: {
    logo: string;
    logoIcon: string;
    logoDark: string;
    favicon: string;
    backgroundImage: string;
    aboutUsBg: string;
    aboutVideo: string;
    pagesBg: string;
  };
  @IsObject()
  pages: {
    aboutUs: string;
    privacyPolicy: string;
    termsCondition: string;
  };
  type: SettingsType;
  name: string;
}
export class CreateDashboardSettingsDto {
  @IsObject()
  dashboardConfig: {
    layoutOptions: {
      typography: string;
      version: string;
      layout: string;
      headerBg: string;
      primary: string;
      navheaderBg: string;
      sidebarBg: string;
      sidebarStyle: string;
      sidebarPosition: string;
      headerPosition: string;
      containerLayout: string;
      direction: string;
    };
  };
  type: SettingsType;
  name: string;
}
export class CreateInfoSettingsDto {
  @IsObject()
  companyDetails: {
    siteName: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    description: string;
    email: string[];
    contact: string[];
    address: string;
    activeHours: string;
    socialMedia: {
      facebookHandle: string;
      twitterHandle: string;
      instagram: string;
      whatsapp: string;
    };
  };
  type: SettingsType;
  name: string;
}
export type CreateAppSettingsDto =
  | CreateInfoSettingsDto
  | CreateDashboardSettingsDto
  | CreateLandingSettingsDto;
