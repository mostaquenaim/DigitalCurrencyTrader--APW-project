import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseFloatPipe, ParseIntPipe, Patch, Post, Put, Query, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminForm } from "./DTOs/adminform.dto";
import { AdminService } from "./adminservice.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './adminSession.guard';
import { Console } from "console";
import { get } from "http";

@Controller('/admin')
export class AdminController
{ 
  constructor(private adminService: AdminService){}

  

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }


  @Get('/getadvisors')
  getAdvisor(): any {
    return this.adminService.getAdvisor();
  }

  
  @Get('/getusers')
  getUser(): any {
    return this.adminService.getUser();
  }

  @Get('/getadvisorimage/:name')
    getadvisorImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
  
    @Get('/getcustomerimage/:name')
    getcustomerimage(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }

  @Get('/findadmin/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getAdminByID(id);
  }

  @Get('/findadminbyuname/:name')
getAdminByName(@Param('name') name: string): any {
  return this.adminService.getAdminByName(name);
}



@Get('/findadminbymobile/:name')
getAdminByMobile(@Param('name') name: string): any {
  return this.adminService.getAdminByMobile(name);
}
  

  @Get('/findcustomer/:id')
  getCustomerByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getCustomerByID(id);
  }

  @Get('/findadvisor/:id')
  getAdvisorByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getAdvisorByID(id);
  }

  //add new admin user
  @Post('/signup')
  @UseInterceptors(FileInterceptor('filename',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  create(@Body() mydto:AdminForm,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  console.log(mydto)
  return this.adminService.create(mydto);
  }
  

  //Login to admin account 
  @Post('/signin')
async signin(@Session() session, @Body() mydto:AdminForm)
  {
   console.log("enter")

    const res = await (this.adminService.signin(mydto));
if(res==true)
{
  // console.log("pass milse")
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
}
}



//logout
@Get('/logout')
logout(@Session() session)
{

  
  if(session)
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
@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Body("email") email:string,
    @Body() mydto: AdminForm
  ): any {
    // if(session.email)
    
    return this.adminService.updateAdmin(mydto, email);
    // else
    // return "LOG IN FIRST"
  }

  @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
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

  @Delete('deleteAdminById')
  @UsePipes(new ValidationPipe())
   deleteAdminById(
    @Session() session,
    @Body("email") email:string, 
  ) {
    return this.adminService.deleteAdminById(session,email);
  }

  //index as default
  @Get('profile')
  viewProfile(@Query('email') email: string) {
    console.log(email);

    return this.adminService.viewProfile(email);
  }


  // @Get('findbyemail')
  // findByEmail(@Body("email") email:string)

  //add t&c
  @Post('addDesc')
  addDesc(@Session() Session,@Body() body){
    return this.adminService.addDesc(Session,body);
  }

  //update
  @Put('upDesc')
  upDesc(@Session() Session,@Body() body){
    return this.adminService.upDesc(Session,body);
  }

  @Delete('delDesc')
  delDesc(@Session() Session,@Body() body){
    return this.adminService.delDesc(Session,body);
  }

  @Get('viewDesc')
  viewDesc(@Session() Session,@Body() body){
    return this.adminService.viewDesc(Session,body);
  }
  //view all customer
  // @Get('viewallcust')
  // viewallcust(@Session() session):any{
  //   return this.adminService.viewallcust(session);
  // }

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
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  return this.adminService.uploadDP(session,file.filename);
  }

  @Patch('/UpdateDP')
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })

  }))
  async updateDP(@Session() session,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 16000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  return this.adminService.updateDP(session,file.filename);
  }

  @Delete('deleteDP')
  deleteDP(@Session() session){
    return this.adminService.deleteDP(session)
  }

  @Get('/admins')
  async getAllAdmins(@Session() session) {
    return this.adminService.getAllAdmins(session);
  }

  @Post('sendemail')
  sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}

  @Get('viewAdvisors')
  viewAdvisors(@Session() session){
    return this.adminService.viewAdvisors(session);
  }
  
  @Post('viewAdvisorById')
  viewAdvisorById(@Session() session,@Body() body){
    return this.adminService.viewAdvisorById(session,body);
  }

  @Post('sendMsgtoCustomer')
  sendMsgtoCustomer(@Session() Session,@Body() body){
    return this.adminService.sendMsgtoCustomer(Session,body);
  }

  @Delete('deleteCus')
  deleteCus(@Session() Session,
  @Body("email") email:string){
    return this.adminService.deleteCus(Session,email);
  }
}