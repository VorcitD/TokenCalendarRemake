import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService extends Mutation {
  createUser = gql`
    mutation CreateUSerMutation(
      $password: String!
      $email: String!
      $name: String!
    ) {
      createUser(password: $password, email: $email, name: $name)
    }
  `;

  handleSignUp(user: User) {
    const data = this.apollo.mutate({
      mutation: this.createUser,
      variables: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createSession: {
          __typename: 'CreateUser',
        },
      },
    });
    return data;
  }
}
