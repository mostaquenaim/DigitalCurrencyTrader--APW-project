import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Crypto")
export class cryptoEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Price: string;

  @Column()
  Market_Cap: string;

  @Column()
  Volume: string;

  @Column()
  Circulating_Supply: string;


 
}




