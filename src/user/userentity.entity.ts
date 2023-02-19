import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name : string
    @Column()
    username : string
    @Column()
    currency : string
    @Column()
    password : string
    @Column()
    email : string

}