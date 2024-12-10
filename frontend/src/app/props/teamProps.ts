export default interface TeamProps{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    contact: string;
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