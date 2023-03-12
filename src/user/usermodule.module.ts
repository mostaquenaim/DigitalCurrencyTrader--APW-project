import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { UserController } from "./user.controller";
import { UserService } from "./userservice.service";
import {UserEntity} from "./userentity.entity"


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule{}