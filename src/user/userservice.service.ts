import { Injectable } from "@nestjs/common";
import { UserForm } from "./userform.dto";

@Injectable()
export class UserService{
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
    
        return "Inserted name: " + mydto.name+" and id is " + mydto.id +",users currency is : "+mydto.currency +"and uname is "+mydto.username;
    }
    update(name,id):any {
        return "updated name: " +name+" and id is " +id;
    }
    updatebyid(name,id):any {
        // return "Update admin where id " +id+" and change name to " +name;
        return "Updated name of id "+id+ " is "+ name;
    }
    deletebyid(id):any {
    
        return "Delete id is "+id;
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


}