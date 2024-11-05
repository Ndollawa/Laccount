import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { AuthProps } from '@props/AuthProps';


const defaultUserState =  {
    id:undefined,
    email:undefined,
    username:undefined,
    verificationStatus:undefined,
    profile:{
        id:undefined,
        firstName:undefined,
        lastName:undefined,
        middleName:undefined,
        phone:undefined,
        dob:undefined,
        gender: undefined,
        address: undefined,
        city: undefined,
        state: undefined,
        country: undefined,
        occupation: undefined,
        bio: undefined,
        image:undefined,
        status:undefined,
        authentication_2FA:undefined,
    },
    online:{
        status:undefined,
        lastSeen:undefined,
     },
    roles:[],
    wallets:[],
    
};

const authSlice = createSlice({
    name:'auth',
    initialState:{ 
        token: null, 
        user: defaultUserState,
    } as AuthProps, 
    reducers:{
        setCredentials: (state, action) =>{
            const {accessToken , user_info} = action.payload;
                // console.log(accessToken)
            state.token = accessToken;
            if(user_info){
            state.user = user_info;
            }
        },
        logOut: (state):void =>{
            state.token = null;
            state.user = defaultUserState;
        }
    },
   
})


 export const {setCredentials, logOut} = authSlice.actions;

 export default authSlice.reducer;
 export const selectCurrentToken = (state:RootState) => state.auth.token;
 export const selectCurrentUser = (state:RootState) => state.auth.user;