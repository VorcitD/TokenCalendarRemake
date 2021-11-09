import bcrypt from 'bcryptjs'
import { User} from "../models/User";
import { getRepository } from "typeorm";
import  jwt  from "jsonwebtoken";
import auth from "../config/auth";

interface Request{
    email:string,
    password:string
}

interface Response {
    user: User;
    token: string;
}

class Authenticate{
    async execute({email,password}:Request):Promise<Response>{
        const repository = getRepository(User);
  
        const user = await repository.findOne({where:{email}})

        if(user){
            const isValidPassword = await bcrypt.compare(password,user.password_hash);
            if(isValidPassword){
                const token = jwt.sign({id:user.id},auth.secret);

                return {
                    user,
                    token,
                };
            }else{
                throw new Error("Incorrect email/password combination");
            }

        }else{
            throw new Error("Incorrect email/password combination");
        }
    }
}

export default Authenticate;