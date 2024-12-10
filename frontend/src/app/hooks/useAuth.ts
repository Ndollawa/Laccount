import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { selectCurrentToken } from "@auth/slices/auth.slice";
import { AuthProps, Role } from "@props/";

const useAuth = ()=>{

    const token =useSelector(selectCurrentToken)
    let isAdmin, isUser, isDev, isStaff = false
    let userRoles;
    if(token){
        const decodedToken:AuthProps['token'] | undefined = token
        ? jwtDecode(token)
           : undefined;
const  roles = decodedToken?.sub?.roles || []
        const userRoles =  roles?.map((role:Role) => role.code)
        isUser = userRoles?.includes("0003")
        isStaff = userRoles?.includes("0002")
        isAdmin = userRoles?.includes("0001")
        isDev = userRoles?.includes("0000")

       
        
    }
    return {username:'',user: '', isUser, isAdmin,isDev,isStaff,roles:userRoles}
}

export default useAuth