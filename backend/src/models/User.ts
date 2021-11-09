import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn ,BaseEntity, OneToMany} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity{
    
    @Field()
    @PrimaryGeneratedColumn("uuid") 
    id!: string;
    
    @Field()
    @Column()
    name!:string;

    @Field()
    @Column()
    email!:string;
    
    @Column()
    password_hash!:string;

    
}