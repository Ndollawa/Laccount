 export interface PostCommentReplyProps
    { 
        id:string;
        author: string;
        authorType: string;
        firstName: string;
        lastName: string;
        email: string;
        fullName: string;
        subject: string;
        comment: string;
        status: string;
        createdAt?:Date;
        updatedAt?:Date;}

 interface postCommentProps{
    id:string;
    postId:string;
    author: string;
    authorType: string;
    firstName: string;
    lastName: string;
    subject: string;
    email: string;
    fullName: string;
    comment: string;
    reply:[{ 
        id:string;
        author: string;
        authorType: string;
        firstName: string;
        lastName: string;
        email: string;
        fullName: string;
        subject: string;
        comment: string;
        status: string;
        createdAt?:Date;
        updatedAt?:Date;}]
    status: string;
    createdAt?:Date;
    updatedAt?:Date;
}
export default postCommentProps