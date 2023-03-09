import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminEntity } from "./adminEntity.entity";
import { AdminService } from "./adminservice.service"

@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'mostaquenaimislam@gmail.com',
                           pass: 'rpebugiaxvjrvxq'
                       },
                      }
          }),
        TypeOrmModule.forFeature([AdminEntity])],
controllers: [AdminController],
providers: [AdminService],

})

export class AdminModule {}