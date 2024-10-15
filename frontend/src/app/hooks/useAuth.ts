import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/slices/auth.slice";
import {jwtDecode} from "jwt-decode";
import { authProps } from "../props/authProps";
import { Role } from "../props/userProps";

const useAuth = ()=>{

    const token =useSelector(selectCurrentToken)
    let isAdmin, isUser, isDev, isStaff = false
    let role = 'User'
    if(token){
        const decodedToken:authProps['token'] | undefined = token
        ? jwtDecode(token)
           : undefined;
const  roles = decodedToken?.sub?.roles || []
        
        isUser = roles?.find((role:Role) => role.code === "0004")
        isStaff = roles?.find((role:Role) => role.code === "0003")
        isAdmin = roles?.find((role:Role) => role.code === "0002")
        isDev = roles?.find((role:Role) => role.code === "000")

        if(isAdmin) role = "Admin" 
        if(isDev) role = "Developer" 
        if(isUser) role = "User" 
        if(isStaff) role = "Staff" 
    }
    return {username:'',user: '', roles:[], isAdmin,isDev,isStaff,role}
}

export default useAuth