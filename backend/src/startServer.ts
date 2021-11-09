import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import  UserResolver  from './graphql/modules/User/resolver';
import SessionResolver from './graphql/modules/Session/resolver';
import EventsResolver from './graphql/modules/Events/resolver';
import { buildSchema } from "type-graphql";
import AuthenticationAssurance from './middlewares/authMiddleware';

async function startServer(){
    const app = express();

    const server = new ApolloServer({schema:await buildSchema({
        resolvers:[UserResolver,EventsResolver,SessionResolver],
        authChecker:AuthenticationAssurance
    }),
    context: ({ req }) => {
        const context = {
            req,
            token: req?.headers?.authorization,
        };

        return context;
    }
});
    await server.start()
    server.applyMiddleware({app});
    app.listen({port:4000},()=>{console.log(`server started at http://localhost:4000/graphql`)});
    return app;
}

export default startServer;