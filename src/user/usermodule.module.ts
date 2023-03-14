import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./user.controller";
import { UserService } from "./userservice.service";
import {UserEntity} from "./userentity.entity"
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,AdminSendMsg])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}