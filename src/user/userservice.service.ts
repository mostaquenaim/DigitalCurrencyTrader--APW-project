import { Injectable } from "@nestjs/common";
import { UserEntity } from "./userentity.entity";
import { UserForm } from "./userform.dto";
import {Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from "@nestjs-modules/mailer";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private mailerService: MailerService
    ){}

    getIndex():string{
        return "this is user index";
    }
    // insertUser(mydto:AdminForm):any {
    //     return "inserted name : "+mydto.name +" and id is " +mydto.id;
    // }
    getUserByID(id):any {
    
        // return "id is "+id;
        return this.userRepo.findOneBy({ id });

    }
    getUserByName(qry):any {
    
        // return "the id is "+qry.id +" and name is "+qry.name;
        return this.userRepo.findOneBy({id:qry.id,name:qry.name})
    }
    async insertUser(mydto:UserForm) {
        const useraccount = new UserEntity()
        const mydata = await this.userRepo.findOneBy({email: mydto.email});
        if(mydata){
            return 0;
        }else

        useraccount.name = mydto.name;
        useraccount.username = mydto.username;
        useraccount.currency= mydto.currency;
        useraccount.password = mydto.password;
        useraccount.email = mydto.email;
        return this.userRepo.save(useraccount) 
    
        // return "Inserted name: " + mydto.name+" and id is " + mydto.id +",users currency is : "+mydto.currency +"and uname is "+mydto.username;
    }
    update(name,id):any {

        return this.userRepo.update({name:name},{name:name});
        return "updated name: " +name+" and id is " +id;
    }

    // update(name,id):any {
    //     console.log(name+id);
    //     return this.userRepo.update(id,{name:name})
    //     // return "updated name: " +name+" and id is " +id;
    // }
    updatebyid(name,id):any {
        console.log(name+id);
        return this.userRepo.update(id,{name:name})
        // return "Update admin where id " +id+" and change name to " +name;
        // return "Updated name of id "+id+ " is "+ name;
    }
    deletebyid(id):any {
    
        // return "Delete id is "+id;
        return this.userRepo.delete(id)
    }
    addCurrency(id):any{
        return 
    }
    deleteCurrencyById(id):any{
        return "currency deleted ";
    }
    tradeHistory(id):any{
        return "trade history";
    }
    clearHistory(id):any{
        return "all clear";
    }
    postStatus(id):any {
    
        return "status posted";
    }
    updateStatus(id):any{
        return "status updated";
    }
    updatePassword(password,id):any{
        return
    }

    // async signup(mydto){
    //     const salt =await bcrypt.genSalt()
    // }

    async login(mydto){
        // console.log(mydto.password);
    const mydata= await this.userRepo.findOneBy({email: mydto.email});
    console.log(mydata);
    if(mydata){
    const isMatch= await bcrypt.compare(mydto.password, mydata.password);
    console.log(isMatch);
    if(isMatch) {
    return 1;
    }
    else {
        return 0;
    }
}
return 0;
}

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.userRepo.save(mydto);
        }


        async sendEmail(mydata){
            return await this.mailerService.sendMail({
                   to: mydata.email,
                   subject: mydata.subject,
                   text: mydata.text, 
                 });
           }


           async view(session){
            if(session.email){
                const mydata = await this.userRepo.findOneBy({ email: session.email });
                return mydata;
            }else
                return "login required";
          }

          async deleteaccount(useremail) {
            const mydata = await this.userRepo.findOneBy({ email:useremail });
            console.log(mydata);
            if(mydata)
            return this.userRepo.delete(mydata);
            return false;
          }
    
      


        


}