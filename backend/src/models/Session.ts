import { Entity,Column, PrimaryGeneratedColumn,BaseEntity} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import {User} from './User';

@ObjectType()
export class Session{
    
    @Field()
    user!: User;
    
    @Field()
    token!:string;


    
}