import {Resolver,Query, Mutation, Arg} from 'type-graphql'
import { User } from '../../../models/User';
import { UserRepository } from '../../../repositories/UserRepository';
import { getCustomRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

@Resolver()
export default class UserResolver {
  private UserRepository:Repository<User>;
  
  constructor(){
   this.UserRepository = getCustomRepository(UserRepository);
  }
  
  @Mutation(()=> Boolean)
  async createUser(
    @Arg("name") name:string,
    @Arg("email") email:string,
    @Arg("password") password:string,
  ){
 
  const password_hash = bcrypt.hashSync(password, 10);

  const newUser = this.UserRepository.create({name,email,password_hash})  
  await this.UserRepository.save(newUser);
    return true;

  }

  @Query(()=>[User])
  async users()
  {
    const listUsers = await this.UserRepository.find();
    console.log(listUsers);
    return listUsers;
  }

}