export interface ResponseProps{
    status: string;
    statusCode: string | number;
    message: string | number;
    timestamp: Date;
    data: object[];
}