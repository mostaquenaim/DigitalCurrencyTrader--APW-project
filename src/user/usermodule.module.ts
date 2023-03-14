import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./user.controller";
import { UserService } from "./userservice.service";
import {UserEntity} from "./userentity.entity"
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";


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
        
        TypeOrmModule.forFeature([UserEntity,AdminSendMsg])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}