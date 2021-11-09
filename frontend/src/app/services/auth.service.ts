import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Apollo, gql, Mutation } from 'apollo-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends Mutation {
  createSession = gql`
    mutation CreateSessionMutation($password: String!, $email: String!) {
      createSession(password: $password, email: $email) {
        token
        user {
          id
        }
      }
    }
  `;

  handleLogin(user: User) {
    const data = this.apollo.mutate({
      mutation: this.createSession,
      variables: { email: user.email, password: user.password },
      optimisticResponse: {
        __typename: 'Mutation',
        createSession: {
          __typename: 'Session',
          token:'',
          user:{
            id:''
          },
        },
      },
    });
    return data;
  }
}
