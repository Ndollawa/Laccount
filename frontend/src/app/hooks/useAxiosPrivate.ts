import { useEffect } from "react";
import { useSelector } from 'react-redux';
import  { axiosPrivate } from "@api/axios";
import useRefreshToken from './useRefreshToken';
import { selectCurrentToken } from '@auth/slices/auth.slice';

const useAxiosPrivate = ()=>{
    const refresh = useRefreshToken();
    const token = useSelector(selectCurrentToken);


    useEffect(()=>{
const requestIntercept = axiosPrivate.interceptors.response.use(
    config =>{
        if(!config?.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${token}`;
            
        }return config;
    },(error)=>Promise.reject(error));


const responseIntercept = axiosPrivate.interceptors.response.use(
    response => response,
    async(error) =>{
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent){
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
    }
)
return()=>{
    axiosPrivate.interceptors.request.eject(requestIntercept)
    axiosPrivate.interceptors.response.eject(responseIntercept)
}


    },[token, refresh])
    return axiosPrivate
}


export default useAxiosPrivate