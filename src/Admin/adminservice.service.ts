import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { AdminEntity } from "./Entity/adminEntity.entity";
import {UserEntity} from "src/user/userentity.entity";
import { AdminForm } from "./DTOs/adminform.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,

    // @InjectRepository(UserEntity)
    // private userRepo:Repository<UserEntity>,

    private mailerService: MailerService
  ) {}


  async sendEmail(mydata){
    return   await this.mailerService.sendMail({
           to: mydata.email,
           subject: mydata.subject,
           text: mydata.text, 
         });
   }


    
    
    async findAll() {
      
    }

    async viewProfile(session){
      if(session.email)
      {
      const mydata = await this.adminRepo.findOneBy({ email: session.email });
      return mydata;
      }
      else
      return "login first";
    }

    async getAllAdmins(session) {
      if (session.email) {
        const mydata = await this.adminRepo.findOneBy({ email: session.email });
        if (mydata) {
          const options: FindManyOptions<AdminEntity> = {};
          const admins = await this.adminRepo.find(options);
          return admins;
        } else {
          return "Only admins have permission.";
        }
      } else {
        return "Please login first.";
      }
    }

    // async viewallcust(session) {
    //   if (session.email) {
    //     const mydata = await this.adminRepo.findOneBy({ email: session.email });
    //     if (mydata) {
    //       const options: FindManyOptions<UserEntity> = {};
    //       const customers = await this.userRepo.find(options);
    //       return customers;
    //     } else {
    //       return "Only admins have permission.";
    //     }
    //   } else {
    //     return "Please login first.";
    //   }
    // }

    async create(mydto:AdminForm) {
      const adminaccount = new AdminEntity()

      const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
      
      if(mydata) 
      {
        return 0;
      }

      adminaccount.name = mydto.name;
      adminaccount.uname = mydto.uname;
      adminaccount.mbl_no = mydto.mbl_no;
      adminaccount.birthDate = mydto.birthDate;
      adminaccount.email = mydto.email;
      adminaccount.password = mydto.password;
      adminaccount.address = mydto.address;

      
      
       return this.adminRepo.save(adminaccount);
        }

      async signin(mydto) {
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        if (!mydata) {
          return false;
        }
        //return mydata.password;
        // console.log(mydto.password);
         console.log(mydata.password);
        if(mydto.password== mydata.password) return true;
        return false;
      }

      async deleteAdmin(Adminemail) {
        const mydata = await this.adminRepo.findOneBy({ email:Adminemail });
        console.log(mydata);
        if(mydata)
        return this.adminRepo.delete(mydata);
        return false;
      }

      async deleteAdminById(session,dEmail:string) {

        if(dEmail){
        if(session.email){
          const mydata = await this.adminRepo.findOneBy({ email:session.email });
          if(mydata){
            
              const dltAdmin=await this.adminRepo.findOneBy({ email:dEmail });
              if(dltAdmin){
                return this.adminRepo.delete(dltAdmin);
              }
              else{
                return "email not found";
              }
          }
          else{
            return "Only admins can"
          }
        }
        else{
          return "Login first";
        }
      }
      else{
        return "wrong input";
      }
        
      }

      async updateAdmin(mydto: AdminForm, email: string): Promise<string> {
        try {
          const result = await this.adminRepo.update({ email: email }, mydto);
          if (result.affected === 0) {
            // No rows were affected by the update
            return 'Admin not found';
          } else {
            // Update was successful
            return 'Admin updated';
          }
        } catch (err) {
          // An error occurred during the update operation
          console.error(err);
          return 'Update failed';
        }
      }

      async uploadDP(session,uFilename:string){
       // return "dhukse";
        try{
        if(session.email){

          const mydto = await this.adminRepo.findOneBy({ email: session.email });
          if(mydto.filename)
          return "DP already uploaded"
          mydto.filename=uFilename;
          const result = await this.adminRepo.save(mydto);
          if (!result) {
          return "File not uploaded"
        }
        else{
          return "File uploaded"
        }
      }
        else{
          return "Login first";
        }
      }
      catch(err){
        console.error(err);
        return "something is wrong"
      }
      }

      
      
      async updateDP(session,uFilename:string){
        // return "dhukse";
         try{
         if(session.email){
           const mydto = await this.adminRepo.findOneBy({ email: session.email });
           mydto.filename=uFilename;
           const result = await this.adminRepo.save(mydto);
           if (!result) {
           return "DP not updated"
         }
         else{
           return "DP updated"
         }
       }
         else{
           return "Login first";
         }
       }
       catch(err){
         console.error(err);
         return "something is wrong"
       }
       }


      async deleteDP(session){
        // return "dhukse";
         try{
         if(session.email){
           const mydto = await this.adminRepo.findOneBy({ email: session.email });
           if(!mydto.filename)
           return "there is not dp"
           mydto.filename=null;
           const result = await this.adminRepo.save(mydto);
           if (!result) {
           return "DP not deleted"
         }
         else{
           return "DP deleted"
         }
       }
         else{
           return "Login first";
         }
       }
       catch(err){
         console.error(err);
         return "something is wrong"
       }
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
    
    
    
    
    deletemsg(id):any {
        
      return "message id "+id+" is requested to be deleted";
    }
    
    allQry(qry){
      return "all query -> "+qry;
    }
    
    

}