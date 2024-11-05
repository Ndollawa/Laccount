import {jwtDecode} from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import axios from "@api/axios";
import { authProps } from "@props/authProps";
import {setCredentials} from '@auth/slices/auth.slice';

const useRefreshToken = ()=>{
   const dispatch = useDispatch()
    const refresh = async ()=>{
        const {data:{accessToken}} = await axios.get('/auth/refresh',{
            withCredentials:true
        });
       const decodedToken: authProps['token'] | undefined = accessToken ? jwtDecode(accessToken) : undefined;
      const user_info = decodedToken?.sub;

      dispatch(setCredentials({ accessToken, user_info }));
    //   console.log(response.data)
        return accessToken;
    }
    return refresh;
}
export default useRefreshToken;