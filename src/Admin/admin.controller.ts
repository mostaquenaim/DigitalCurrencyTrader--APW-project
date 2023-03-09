import { Body, Controller, Delete, Get, Param, ParseFloatPipe, ParseIntPipe, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";
import { AdminService } from "./adminservice.service";


@Controller("/admin")
export class AdminController
{ 
  constructor(private adminService: AdminService){}

  
  //index as default
  @Get('/index')
  getExample():any {
    return this.adminService.getExample();
  }

  //find an id
  // @Get('/:id')
  // findOne(@Param('id') id) {
  //   return this.adminService.findOne(id);
  // }


  //add new body
  @Post('/add')
  @UsePipes(new ValidationPipe())
  create(@Body() mydto:AdminForm):any {
    return this.adminService.create(mydto);
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

  //delete id
  @Delete('delete/:id')
  deleteUserbyid(@Param('id') id) {
    return this.adminService.deleteUserbyid(id);
  }

  @Post('/sendemail')
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