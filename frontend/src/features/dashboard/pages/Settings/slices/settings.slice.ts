import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { CompanyInfo, DashboardConfig, LandingConfig, LandingPageConfig, Settings, SettingsState, Styles } from '@props/settingsProps';
import { SettingsType } from "@enums/index"

       const landingConfig :LandingConfig ={
        landingPageConfig:{
            showBlog:false,
            showAffiliate:false,
            showTestimonial:false,
            showMetrics : false,
            showPartners : false,
            showTeam : false,
            showServices : false,
            showOurBenefit : false,
            showWhatWeOffer : false,
            navStyle:Styles.STYLE_1,
            sliderStyle:Styles.STYLE_1,
            aboutStyle:Styles.STYLE_2,
            testimonialStyle:Styles.STYLE_1,
            serviceStyle:Styles.STYLE_2,
            ourBenefitStyle:Styles.STYLE_2,
            ourBlogStyle:Styles.STYLE_2,
            whatWeOfferStyle:Styles.STYLE_1,
          },
          colors: {
            primary: '',
            secondary:'',
            tertiary: '',
          },
          sliders: [],
        siteImages:{
            logo:'',
            logoIcon:'',
            logoDark:'',
            favicon:'',
            backgroundImage:'',
            aboutUsBg:'',
            aboutVideo:'',
            pagesBg:'',
        },
        pages:{
            aboutUs:'',
            privacyPolicy:'',
            termsCondition:''
        }
  
 };
const dashboardConfig:DashboardConfig = {
          dashboardConfig:{
            layoutOptions: {
                typography: 'poppins',
                version: 'light',
                layout: 'vertical',
                primary: 'color_10',
                headerBg: 'color_1',
                navheaderBg: 'color_4',
                sidebarBg: 'color_4',
                sidebarStyle: 'full',
                sidebarPosition: 'fixed',
                headerPosition: 'fixed',
                containerLayout: 'full',
                direction: 'ltr',
              },
            }
    };
const companyInfo: CompanyInfo ={
    companyDetails:{
            siteName:'',
            city:'',
            state:'',
            country:'',
            zip:'',
            description:'',
            email:[],
            contact:[],
            address:'',
            activeHours:'',
            socialMedia:{
            facebookHandle:'',
            twitterHandle:'',
            instagram:'',
            whatsapp:''
        }
    }
   };

const initialState:SettingsState = {
    landingConfig:{
        id: "",
        name: SettingsType.LANDING,
        type: SettingsType.LANDING,
        userDefined: false,
        default:landingConfig,
        settings:landingConfig,  
    } as Settings<LandingConfig>,
    dashboardConfig:{
        id: "",
        name: SettingsType.DASHBOARD,
        type: SettingsType.DASHBOARD,
        userDefined: false,
        default:dashboardConfig,
        settings:dashboardConfig,  
    } as Settings<DashboardConfig>,
    companyInfo:{
        id: "",
        name: SettingsType.COMPANY_INFO,
        type: SettingsType.COMPANY_INFO,
        userDefined: false,
        default:companyInfo,
        settings:companyInfo,  
    } as Settings<CompanyInfo>,  
}


export const appSettingsSlice = createSlice({
    name:'appSettings',
    initialState,
    reducers:{
        setSettings:(state,action)=>{
            
            // console.log(action.payload)
                    return action.payload
        },
        setCompanyInfoSetting: (state, action: PayloadAction<Settings<CompanyInfo>>) => {
            // console.log(action.payload)
            state.companyInfo = { ...state.companyInfo, ...action.payload };
          }
          ,
        setDashboardSetting:(state,action: PayloadAction<Settings<DashboardConfig>>)=>{
            console.log(action.payload)
            state.dashboardConfig ={ ...state.dashboardConfig, ...action.payload};
        },
        setLandingSetting:(state,action: PayloadAction<Settings<LandingConfig>>)=>{
            // console.log(action.payload)
            state.landingConfig={...state.landingConfig,...action.payload}
        },
    

    }
})

export const useCompanyInfo = (state:RootState)=>state.appSettings.companyInfo;
export const useLandingConfig = (state:RootState)=>state.appSettings.landingConfig;
export const useDashboardConfig = (state:RootState)=>state.appSettings.dashboardConfig;
export const useSettings = (state:RootState)=>state.appSettings
export const {setCompanyInfoSetting,setDashboardSetting,setLandingSetting,setSettings} = appSettingsSlice.actions;
export default appSettingsSlice.reducer;