export default interface ServiceProps{
    id:string;
    title:string;
    description:string;
    body:string;
    image:string;
    icon:string;
    tags?:string[];
    status:string;
    createdAt?:Date;
    updatedAt?:Date;
}