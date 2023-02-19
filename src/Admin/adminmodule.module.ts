import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminEntity } from "./adminEntity.entity";
import { AdminService } from "./adminservice.service"

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity])],
controllers: [AdminController],
providers: [AdminService],

})

export class AdminModule {}