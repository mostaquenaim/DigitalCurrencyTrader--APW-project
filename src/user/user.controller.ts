import { Body, Controller , Delete, Get,Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe} from "@nestjs/common";
// import { get } from "http";
import { UserForm } from "./userform.dto";
import { UserService } from "./userservice.service";


@Controller("/user")
    export class UserController{
        constructor(private userService: UserService){}
        @Get("/index")
        getUser(): any{
            return this.userService.getIndex();
        }
        @Get("/search/:id")
        getUserByID(@Param("id",ParseIntPipe)id:number):any{
            return this.userService.getUserByID(id);
        }
        @Get("/search")
        getUserByName(@Query() qry:any): any {
          return this.userService.getUserByName(qry);
        }  
        

        @Post("/insert")
        @UsePipes(new ValidationPipe())
        insertUser(@Body() mydto:UserForm): any {
            return this.userService.insertUser(mydto);
        }
        @Put("/update/")
        @UsePipes(new ValidationPipe())
        update( 
          @Body("name") name:string, 
          @Body("id") id:number): any {
        return this.userService.update(name, id);
        }
        @Put("/updateuser/:id")
        updateUserbyid( 
            @Body("name") name:string, 
            @Param("id", ParseIntPipe) id:number): any {
          console.log(name);
              //  return this.userService.updatebyid(name,id);
          }
          @Delete("/deleteuser/:id")
          deleteUserbyid( 
          @Param("id", ParseIntPipe) id:number): any {
            return this.userService.deletebyid(id);
          }

          @Delete("/deleteCurrency/:id")
          deleteCurrencyById(
            @Param("id",ParseIntPipe) id:number): any{
                return this.userService.deleteCurrencyById(id);
            }

            @Get("/history/:id")
            // tradehistory()
            tradehistory(@Param("id",ParseIntPipe)id:number):any{
                return this.userService.tradeHistory(id);
            }
            @Delete("/clearhistory/:id")
            clearHistory(
            @Param("id",ParseIntPipe) id:number): any{
                return this.userService.clearHistory(id);
            }
            @Post("/status/:id")
            @UsePipes(new ValidationPipe())
            postStatus(@Body() id): any {
                return this.userService.postStatus(id);
        }
            // @Put("/updateuser/:id")
            // updateStatus(@Body() id):any{ 
            // return this.userService.updateStatus(id);
            // }
            // post put patch
            // paeseint parsedouble
            
        



}
