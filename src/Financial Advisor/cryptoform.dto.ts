import {IsInt, Matches, MinLength, MaxLength, IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CryptoForm{

   
    Name: string;
    
    Price: string;
 
    Market_Cap: string;
   
    Volume: string; 
  
    Circulating_Supply:string;
}

