import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name : string
    @Column()
    uname : string
    @Column()
    address : string
    @Column()
    password : string
    @Column({ unique: true })
    @Index({ unique: true })
    email: string;
    @Column()
    birthDate : string
    @Column()
    mbl_no : string
    @Column({ nullable: true })
    filename:string

}