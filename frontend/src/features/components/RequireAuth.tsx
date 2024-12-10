import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';
import {AuthProps, allowedRolesProps, Role} from '@props';
import { selectCurrentToken } from '@auth/slices/auth.slice';
import useLocalStorage from '../../app/hooks/useLocalStorage';
import { useEffect } from 'react';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const location = useLocation();
    const token = useSelector(selectCurrentToken);
// const [prevPage, setPrevPage] = useLocalStorage(
//   "prevPage",
//   location.state?.from?.pathname
// );
// useEffect(()=>{
// console.log(location.state?.from?.pathname);
// // setPrevPage(location.state?.from?.pathname);


// },[prevPage])
    const decodedToken:AuthProps['token'] | undefined = token
             ? jwtDecode(token)
                : undefined;
    const  roles = decodedToken?.sub?.roles || []
    return(
        token === null || undefined
        ?<Navigate to="/auth/login" state={{from:location.state?.from}} replace />
        :roles?.find((role:Role) => allowedRoles?.includes(role?.code))
        ? <Outlet/>
        : token
        ?<Navigate to="/error/403" replace state={{from:location.state?.from}} />
        : <Outlet/>
       
    );
}

export default RequireAuth;