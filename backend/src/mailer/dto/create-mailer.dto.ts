import { IsString } from "class-validator";

export class CreateMailerDto {
    @IsString()
    template:string;

    @IsString()
    name:string;
    
    type:
}
