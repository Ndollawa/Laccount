import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {authProps, allowedRolesProps} from '../../../app/props/authProps';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../auth/slices/auth.slice';
import { Role } from '../../../app/props/userProps';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const location = useLocation();
    const token = useSelector(selectCurrentToken);


    const decodedToken:authProps['token'] | undefined = token
             ? jwtDecode(token)
                : undefined;
    const  roles = decodedToken?.sub?.roles || []
    console.log(roles);
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