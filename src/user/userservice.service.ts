import { Injectable } from "@nestjs/common";
import { UserEntity } from "./userentity.entity";
import { UserForm } from "./userform.dto";
import {Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>  
    ){}

    getIndex():string{
        return "this is user index";
    }
    // insertUser(mydto:AdminForm):any {
    //     return "inserted name : "+mydto.name +" and id is " +mydto.id;
    // }
    getUserByID(id):any {
    
        return "id is "+id;
    }
    getUserByName(qry):any {
    
        return "the id is "+qry.id +" and name is "+qry.name;
    }
    insertUser(mydto:UserForm):any {
        const useraccount = new UserEntity()
        useraccount.name = mydto.name;
        useraccount.username = mydto.username;
        useraccount.currency= mydto.currency;
        useraccount.password = mydto.password;
        useraccount.email = mydto.email;
        return this.userRepo.save(useraccount) 
    
        // return "Inserted name: " + mydto.name+" and id is " + mydto.id +",users currency is : "+mydto.currency +"and uname is "+mydto.username;
    }
    update(name,id):any {
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
    //     const 
    // }


}