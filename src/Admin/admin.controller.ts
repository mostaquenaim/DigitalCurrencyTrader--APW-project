import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseFloatPipe, ParseIntPipe, Post, Put, Query, Req, Request, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";
import { AdminService } from "./adminservice.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './adminSession.guard';
import { Console } from "console";
import { get } from "http";


@Controller("/admin")
export class AdminController
{ 
  constructor(private adminService: AdminService){}

  
  //add new admin user
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async create(@Body() mydto:AdminForm) {
    const result = this.adminService.create(mydto);
    if(await result === 0) {
      return "email already signed up";
    } else {
     // console.log(result);
      return "account created";
    }
  }
  

  //Login to admin account 
  @Post('/signin')
async signin(@Session() session, @Body() mydto:AdminForm) {
  const isMatch = await this.adminService.signin(mydto);
  if (isMatch) {
    session.email = mydto.email;
  //  console.log(session.email);
    return { message: "Welcome" };
  } else {
    return { message: "Email and password did not match" };
  }
}

//logout
@Get('/logout')
logout(@Session() session)
{
  
  if(session.email)
  {
    session.destroy()
    return {message:"you are logged out successfully"};
  }
  else
  {
    throw new UnauthorizedException("Can't log out");
  }
}

@Put('/updateadmin')
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Session() session,
    @Body() mydto: AdminForm
  ): any {
    if(session.email)
    return this.adminService.updateAdmin(mydto, session.email);
    else
    return "LOG IN FIRST"
  }

  //delete id
  @Delete('delete')
  deleteAdmin(@Session() session) {
    
    if(session.email)
    {
    if(this.adminService.deleteAdmin(session.email))
    {
    session.destroy();
    return "Deleted successfully";
    }
    }
    return "Must login first";
  }

  @Delete('deleteById')
  @UsePipes(new ValidationPipe())
   deleteAdminById(
    @Session() session,
    @Body("email") email:string, 
  ) {
    return this.adminService.deleteAdminById(session,email);
    
      
  }

  //index as default
  @Get('/profile')
  viewProfile(@Session() session):any {

    
    return this.adminService.viewProfile(session);
    
  }

  //find an id
  // @Get('/:id')
  // findOne(@Param('id') id) {
  //   return this.adminService.findOne(id);
  // }

  @Post('/UploadDP')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })

  }))


  async uploadDP(@Session() session,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  

  
  return this.adminService.uploadDP(session,file);
  }


  @Get('/admins')
  async getAllAdmins(@Session() session) {
    return this.adminService.getAllAdmins(session);
  }
  
  //transformation-1 parseInt
  @Get("/search/:id")
        getUserByID(@Param("id",ParseIntPipe)id:number):any{
            return this.adminService.getUserByID(id);
        }

    //transformation-2 parseFloat
  @Get("/floattest/:id")
  FloatTest(@Param("id",ParseFloatPipe)id){
      return this.adminService.FloatTest(id);
  }      

  //update id,name
  @Put('update/:id')
  updateUser( 
    @Body("name") name:string, 
    @Body("id") id:number
    ): any {
  return this.adminService.updateUser(name, id);
  }



  

  @Post('sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}


  //view by customer id
  @Get('/cutomer/id')
  findcustomer(@Param('id') id): string {
    return this.adminService.findcustomer(id);
  }

  //find user
  @Get("/finduser")
    getUserByIDName(@Query() qry:any): any {
      return this.adminService.getUserByIDName(qry);
    }
    
    //send message
    @Post('/sendmsg')
  sendmeesage(@Body() body) {
    return this.adminService.sendmeesage(body);
  }

  //delete messag
  @Delete('msg/delete/:id')
  deletemsg(@Param('id') id) {
    return this.adminService.deletemsg(id);
  }


  //update message
  @Put('updatemsg/:id')
  updatemsg(@Param('id') id, @Body() body) {
    return this.adminService.updatemsg(id, body);
  }

  //view message
  @Get('/msg/:id')
  seemsg(@Query() qry:any) {
    return this.adminService.seemsg(qry);
  }

  //get all query
  @Get('all')
  allQry(@Query() qry:any) {
    return this.adminService.allQry(qry);
  }
  
}