    import defaultUserMale from '../../assets/images/user/usermale.jpg'
    import defaultUserFemale from '../../assets/images/user/userfemale.png'
    import defaultUnknownUser from '../../assets/images/user/unknown.jpg'
    import defaultUnknownUser2 from '../../assets/images/user/unknown1.jpg'
    import defaultUserMale2 from '../../assets/images/user/userfemale.jpg'
    import defaultUserFemale2 from '../../assets/images/user/userfemale.jpg'
    import defaultUser from '../../assets/images/user/defaultUser.jpeg'
    import defaultUser2 from '../../assets/images/user/defaultUser2.jpeg'
    import userInterface from '../props/userProps'

    const BASE_URL = import.meta.env.VITE_BASE_URL

const getUserImage = (user:userInterface['user'])=>{
    if(user?.verificationStatus && user?.userImage && user?.userImage !== ''){
            return BASE_URL+'/uploads/users/'+user?.userImage
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

export default getUserImage