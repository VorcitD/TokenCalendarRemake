import { Entity,Column, PrimaryGeneratedColumn ,BaseEntity, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import {User} from './User';


@ObjectType()
@Entity("events")
export class Eventos extends BaseEntity{
    
    @Field()
    @PrimaryGeneratedColumn("uuid") 
    id!: string;
    
    @Field()
    @Column()
    description!:string;

    @Field()
    @Column()
    init_date!:string;
    
    @Field()
    @Column()
    end_date!:string;

    @Field()
    @Column()
    user_id!:string

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;
}