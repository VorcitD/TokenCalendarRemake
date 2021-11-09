import {Resolver, Mutation, Arg} from 'type-graphql'
import { Session } from "../../../models/Session";
import Authenticate from '../../../services/authenticate';


@Resolver()
export default class SessionResolver {

  @Mutation(()=> Session)
  async createSession(
    @Arg("email") email:string,
    @Arg("password") password:string,
  ){
    
    const authenticateUser = new Authenticate();

    const {user,token} = await authenticateUser.execute({email,password});

    delete user.password_hash;

    return {user, token};

  }}
