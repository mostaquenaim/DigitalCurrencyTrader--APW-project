import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class Blog{

    @IsString() 
    @IsNotEmpty() 
    Author_Name: string;

    @MaxLength(1000)
    Content: string;
   
}