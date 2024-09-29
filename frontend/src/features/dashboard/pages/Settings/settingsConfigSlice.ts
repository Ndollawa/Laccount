import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../../../app/stores/store';

enum Styles{STYLE_1=1,STYLE_2, STYLE_3};
const initialState = {
    landingConfig:{
        landingPageConfig:{
            showBlog:false,
            showAffiliate:false,
            showTestimonial:false,
            navStyle:Styles.STYLE_1,
            sliderStyle:Styles.STYLE_1,
            aboutStyle:Styles.STYLE_1,
            testimonialStyle:Styles.STYLE_1,
            serviceStyle:Styles.STYLE_1,
            ourBenefitStyle:Styles.STYLE_2,
            ourBlogStyle:Styles.STYLE_2,
            whatWeOfferStyle:Styles.STYLE_1,
        },
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
    },
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
        },
        companyInfo:{
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
        },  
    
}


export const settingsConfigSlice = createSlice({
    name:'settingsConfig',
    initialState,
    reducers:{
        setSettings:(state,action)=>{
            console.log(action.payload);
            return action.payload
            // console.log(state);
        },
        setCompanyInfoSetting:(state,action)=>{
            // const {}=action.payload;
            state.companyDetails={ ...state.companyDetails, ...action.payload };
        },
        setDashboardSetting:(state,action)=>{
            console.log(action.payload)
            state.dashboardConfig.layoutOptions ={ ...state.dashboardConfig.layoutOptions, ...action.payload};
        },
        setLandingSetting:(state,action)=>{
            // const {}=action.payload;
            state.landingPageConfig={...state.landingConfig,...action.payload}
        },
    

    }
})

export const useCompanyInfo = (state:RootState)=>state.settingsConfig.companyInfo;
export const useLandingPageConfig = (state:RootState)=>state.settingsConfig.landingPageConfig;
export const useDashboardConfig = (state:RootState)=>state.settingsConfig.dashboardConfig;
export const useSettings = (state:RootState)=>state.settingsConfig
export const {setCompanyInfoSetting,setDashboardSetting,setPagesSetting,setLandingSetting,setSettings} = settingsConfigSlice.actions;
export default settingsConfigSlice.reducer;