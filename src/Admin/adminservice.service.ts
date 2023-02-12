import { Injectable } from "@nestjs/common";
import { AdminForm } from "./adminform.dto";


@Injectable()
export class AdminService {

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
    
    seemsg(qry):any{
      return "the msg is "+qry.id;
    }
    
      create(body): any {
        return body;
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