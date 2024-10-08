 interface teamProps{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    status: string;
    bio: string;
    socialMedia:{
    facebookHandle: string;
    twitterHandle: string;
    instagram: string;
    whatsapp: string;
    }
    position: string;
    createdAt?:Date;
    updatedAt?:Date;
}
export default teamProps