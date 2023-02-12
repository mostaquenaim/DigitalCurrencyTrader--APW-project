// export class UserForm{
//     @IsNotEmpty({messege: "enter yout id"})
//     id:number;
// }
import { IsInt, IsNotEmpty, Length } from "class-validator";
export class UserForm {   
    @IsNotEmpty({message: "Please enter your id"}) 
    @IsInt()
    id: number;

    @IsNotEmpty()
    @Length(3,8)
    name: string;

    // @IsNotEmpty()
    @Length(3)
    currency: string;

    
}