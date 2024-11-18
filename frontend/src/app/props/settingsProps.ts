import { SettingsType } from "../enums"

 export enum Styles {
    STYLE_1 = 1,
    STYLE_2,
    STYLE_3,
    STYLE_4,
  }
  
  export interface LandingPageConfig {
    showBlog: boolean;
    showAffiliate: boolean;
    showTestimonial: boolean;
    showMetrics: boolean;
    showPartners: boolean;
    showTeam: boolean;
    showServices: boolean;
    showOurBenefit: boolean;
    showWhatWeOffer: boolean;

    navStyle: Styles;
    sliderStyle: Styles;
    aboutUsStyle: Styles;
    testimonialStyle: Styles;
    serviceStyle: Styles;
    ourBenefitStyle: Styles;
    ourBlogStyle: Styles;
    whatWeOfferStyle: Styles;
  }
  export interface HomeSlide{
    id:number;
     title: string;
     description: string;
     body: string;
     cto:{
       cto_text?:string;
       link?:string;
     }
     image: string;
     status: string
 }
  export interface SiteImages {
    logo: string;
    logoIcon: string;
    logoDark: string;
    favicon: string;
    backgroundImage: string;
    aboutUsBg: string;
    aboutVideo: string;
    pagesBg: string;
  }
  export interface Colors {
    primary: string;
    secondary: string;
    tertiary: string;
    }
  
  export interface Pages {
    aboutUs: string;
    privacyPolicy: string;
    termsCondition: string;
  }
  
  export interface LandingConfig {
    landingPageConfig: LandingPageConfig;
    colors:Colors;
    sliders:HomeSlide[];
    siteImages: SiteImages;
    pages: Pages;
  }
  
  export interface LayoutOptions {
    typography: string;
    version: string;
    layout: string;
    primary: string;
    headerBg: string;
    navheaderBg: string;
    sidebarBg: string;
    sidebarStyle: string;
    sidebarPosition: string;
    headerPosition: string;
    containerLayout: string;
    direction: string;
  }
  
  export interface DashboardConfig {
    dashboardConfig:{
    layoutOptions: LayoutOptions;
    }
  }
  
  export interface SocialMedia {
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
  }
  
  export interface CompanyInfo {
    companyDetails:{
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
    socialMedia: SocialMedia;
  }
}
  
  export interface Settings<T>{
    id:string;
    name:SettingsType;
    type:SettingsType;
    default:T;
    settings:T;
    userDefined:boolean;

  }

  export interface SettingsState {
    landingConfig: Settings<LandingConfig>;
    dashboardConfig: Settings<DashboardConfig>;
    companyInfo: Settings<CompanyInfo>;
  }
