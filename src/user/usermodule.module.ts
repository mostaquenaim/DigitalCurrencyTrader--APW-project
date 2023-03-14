import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./user.controller";
import { UserService } from "./userservice.service";
import {UserEntity} from "./userentity.entity"
// { ManagerService } from "src/manager/manager.service";
// import { ManagerEntity } from "src/manager/manager.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    
    imports:[
        
        MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'ahnaf.ahmed.42173@gmail.com',
                       pass: 'wzkzjbgcmcxkszdi'
                   },
                  }
      }),
        
        TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}