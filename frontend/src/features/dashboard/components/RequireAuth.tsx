import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {authProps, allowedRolesProps} from '../../../app/utils/props/authProps';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../auth/slices/auth.slice';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const location = useLocation();
    const token = useSelector(selectCurrentToken);


    const decodedToken:authProps['auth'] | undefined = token
             ? jwtDecode(token)
                : undefined;
    const  roles = decodedToken?.userInfo?.roles || []
    // console.log(token)
    return(
        token === null || undefined
        ?<Navigate to="/auth/login" state={{from:location}} replace />
        :roles?.find((role:number) => allowedRoles?.includes(role))
        ? <Outlet/>
        : token
        ?<Navigate to="/error/403" replace state={{from:location}} />
        : <Outlet/>
       
    );
}

export default RequireAuth;