import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "./adminEntity.entity";
import { AdminForm } from "./adminform.dto";


@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
    private mailerService: MailerService
  ) {}


  async sendEmail(mydata){
    return   await this.mailerService.sendMail({
           to: mydata.email,
           subject: mydata.subject,
           text: mydata.text, 
         });
   }


    getExample(){
        return "this is an example"; 
      }
    
      findcustomer(id){
        return "the customer id is "+id;
      }
    
      findOne(id){
        return "the id is "+id;
      }
    
      getUserByIDName(qry):any {
        
        return "the id is "+qry.id +" and name is "+qry.name;
    }

    getUserByID(id):any{
      return "the customer id is "+id;
    }
    
    seemsg(qry):any{
      return "the msg is "+qry.id;
    }

    FloatTest(id):any{
      return "the customer id is "+id;
    }
    
    create(mydto:AdminForm):any {
      const adminaccount = new AdminEntity()
      adminaccount.name = mydto.name;
      adminaccount.uname = mydto.uname;
      adminaccount.mbl_no = mydto.mbl_no;
      adminaccount.birthDate = mydto.birthDate;
      adminaccount.email = mydto.email;
      adminaccount.password = mydto.password;
      adminaccount.address = mydto.address;
     return this.adminRepo.save(adminaccount);
        }
    
      updateUser(name,id):any {
        return " updated name: " +name+" and id is " +id;
    }
    
    sendmeesage(body): any {
      return body;
    }
      
    updatemsg(msg,id):any {
        return " updated msg: " +msg+" and id is " +id;
    }
    
    deleteUserbyid(id):any {
        
      return id+" is requested to be deleted";
    }
    
    deletemsg(id):any {
        
      return "message id "+id+" is requested to be deleted";
    }
    
    allQry(qry){
      return "all query -> "+qry;
    }
    
    

}