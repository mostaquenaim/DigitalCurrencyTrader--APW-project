import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name : string
    @Column()
    uname : string
    @Column()
    currency : string
    @Column()
    password : string
    @Column()
    email : string

}