import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@store/store';

      

export const walletSlice = createSlice({
    name:'wallet',
    initialState: {
        balance: 0,
        status: 'idle',
        error: null,
      },
    reducers:{
        setSettings:(state,action)=>{
            
            // console.log(action.payload)
                    return action.payload
        },
        // setCompanyInfoSetting: (state, action: PayloadAction<Settings<CompanyInfo>>) => {
        //     // console.log(action.payload)
        //     state.companyInfo = { ...state.companyInfo, ...action.payload };
        //   }
        //   ,
        
    }
})

// export const useDashboardConfig = (state:RootState)=>state.appSettings.dashboardConfig;
export const useSettings = (state:RootState)=>state.appSettings
export const {setSettings} = walletSlice.actions;
export default walletSlice.reducer;