import { Body, Controller ,
     Delete, Get,Param, 
     ParseIntPipe,UploadedFile, 
     Post, Put, Query, UsePipes, 
     ValidationPipe, Session, 
     UseGuards,ParseFilePipe,UseInterceptors,
     FileTypeValidator,MaxFileSizeValidator} from "@nestjs/common";
// import { get } from "http";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserForm } from "./userform.dto";
import { UserService } from "./userservice.service";
import { SessionGuard } from './usersession.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


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
        @UsePipes(new ValidationPipe())
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

            @Get('/login')
           async login(@Session() session, @Body() mydto:UserForm){
                const pass = this.userService.login(mydto)
            // if(this.userService.login(mydto)){
                if(await pass===1){
                session.email = mydto.email;
                // console.log(session.email);
            return {message:"success"};
            }else{
                return {message:"invalid credentials"};
            }
            
            }

            // @Post('/signup')
            // @UsePipes(new ValidationPipe())
            // async create(@Body() mydto:UserForm) {
            //   const result = this.userService.insertUser(mydto);
            //   if(await result === 0) {
            //     return "an account has assigned to this email";
            //   } else {
            //    // console.log(result);
            //     return "account created";
            //   }
            // }

            @Post('/signup')
            @UseInterceptors(FileInterceptor('myfile',
            {storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            }
            })

            }))
             signup(@Body() mydto:UserForm,@UploadedFile(  new ParseFilePipe({
             validators: [
                 new MaxFileSizeValidator({ maxSize: 2000000 }),
                 new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
             ],
             }),) file: Express.Multer.File){

            mydto.file = file.filename;  

            return this.userService.signup(mydto);
            console.log(file)
            }

            @Get('/logout')
            logout(@Session() session){
            if(session.email){
                session.destroy()
                return {message:"logged out successfully"};
            }else{
                throw new UnauthorizedException("Can't log out");
            }
        }

        @Post('/sendmail')
        sendEmail(@Body() mydata){
        return this.userService.sendEmail(mydata);
}

        @Get('/profile')
        view(@Session() session):any {
        return this.userService.view(session);
    }

    @Delete('delete')
    deleteaccount(@Session() session) {
      
      if(session.email){
        if(this.userService.deleteaccount(session.email)){
            session.destroy();
            return "account deleted ";
      }
    }
      return "need to login first";
}


}
