import defaultUserMale from '@assets/images/user/usermale.jpg'
import defaultUserFemale from '@assets/images/user/userfemale.png'
import defaultUnknownUser from '@assets/images/user/unknown.jpg'
import defaultUnknownUser2 from '@assets/images/user/unknown1.jpg'
import defaultUserMale2 from '@assets/images/user/userfemale.jpg'
import defaultUserFemale2 from '@assets/images/user/userfemale.jpg'
import defaultUser from '@assets/images/user/defaultUser.jpeg'
import defaultUser2 from '@assets/images/user/defaultUser2.jpeg'
const USER_ASSETS = import.meta.env.VITE_USER_ASSETS;
const useUserImage = (user:any)=>{
    if(user?.verificationStatus && user?.userImage && user?.userImage !== ''){
        return USER_ASSETS+user?.userImage
    }else if(user?.verificationStatus && user?.gender === 'male'){
        return defaultUserMale
    }else if(user?.verificationStatus && user?.gender === 'female'){
        return defaultUserFemale
    }else if(user?.verificationStatus && !user?.gender){
        return defaultUser2
    }else{
        return defaultUnknownUser
    }

}

export default useUserImage