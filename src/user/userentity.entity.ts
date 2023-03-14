import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminSendMsg } from "src/Admin/Entity/adminSendMsg.entity";


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
    @Column({ nullable: true })
    file: string

    @OneToMany(()=> AdminSendMsg,(adminSendMsg)=>adminSendMsg.user)
    adminSendMsgs:AdminSendMsg[]
}