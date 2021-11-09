import jwt from 'jsonwebtoken';
import auth from '../config/auth';
import {AuthChecker} from 'type-graphql'


interface Context{
    token?:string;
}

const AuthenticationAssurance : AuthChecker<Context> = ({context:Context}):boolean=>{
    const authHeader = Context.token;

    if(authHeader){
        
        const [,token] = authHeader.split(' ')
        console.log(token)
        try {
            const decoded = jwt.verify(token,auth.secret);

            return !!decoded;

        } catch {
            return false;
        }

    }else{
        return false;
    }

}

export default AuthenticationAssurance;