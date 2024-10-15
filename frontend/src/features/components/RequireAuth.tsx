import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {AuthProps, allowedRolesProps} from '../../app/props/AuthProps';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../auth/slices/auth.slice';
import { Role } from '../../app/props/userProps';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const location = useLocation();
    const token = useSelector(selectCurrentToken);


    const decodedToken:AuthProps['token'] | undefined = token
             ? jwtDecode(token)
                : undefined;
    const  roles = decodedToken?.sub?.roles || []
    return(
        token === null || undefined
        ?<Navigate to="/auth/login" state={{from:location}} replace />
        :roles?.find((role:Role) => allowedRoles?.includes(role?.code))
        ? <Outlet/>
        : token
        ?<Navigate to="/error/403" replace state={{from:location}} />
        : <Outlet/>
       
    );
}

export default RequireAuth;