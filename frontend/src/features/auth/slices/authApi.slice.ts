import { apiSlice } from "@api/apiSlice";
import { logOut , setCredentials} from "./auth.slice";
import {jwtDecode} from 'jwt-decode';
import { uthProps } from "@props/AuthProps";
import localStorage from "redux-persist/es/storage";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation<any, any>({
           query:credentials=>({
                url: '/auth/login',
                method: 'POST',
                body:{
                    ...credentials
                },
                
            }),
        }),
        register:builder.mutation({
            query:credentials=>({
                url:'/auth/register',
                method:'POST',
                body:{
                    ...credentials
                }
            })
        }),
        logout:builder.mutation<any, void>({
            query:()=>({
                url:'/auth/logout',
                method:'POST',
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try {
                //    const data =
                    await queryFulfilled
                   dispatch(logOut())
                    setTimeout(()=>{
                   dispatch(apiSlice.util.resetApiState())
                    },1000) 
                    localStorage.removeItem('persist:rootApp')
                } catch (error) {
                    console.log(error)
                }
            }
        }),   
         refresh:builder.mutation<any, void>({
            query:()=>({
                url:'/auth/refresh',
                method:'GET',
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data}= await queryFulfilled
                    const{accessToken} = data
                    const decodedToken: AuthProps['token'] | undefined = accessToken ? jwtDecode(accessToken) : undefined;
                    const user_info = decodedToken?.sub;
              
                    dispatch(setCredentials({ accessToken, user_info }));
                } catch (error) {
                    
                    console.log(error)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutMutation 
} = authApiSlice;