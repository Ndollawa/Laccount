 export default interface RoomProps{
    id:string;
    title:string;
    description:string;
    members:string;
    image:string;
    status:string;
    createdAt?:Date;
    updatedAt?:Date;
}
