import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation, Query } from 'apollo-angular';
import { Evento } from '../models/events.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private apollo: Apollo) {
  }

  listEvents = gql`
    query ListEventsQuery($userId: String!) {
      Eventos(user_id: $userId) {
        id
        description
        init_date
        user_id
        end_date
      }
    }
  `;

  createEvent = gql`
    mutation CreateEventMutaton(
      $userId: String!
      $endDate: String!
      $initDate: String!
      $description: String!
    ) {
      createEvent(
        user_id: $userId
        end_date: $endDate
        init_date: $initDate
        description: $description
      )
    }
  `;

  updateEvent = gql`
    mutation updateEvent(
      $endDate: String!
      $initDate: String!
      $description: String!
      $updateEventId: String!
    ) {
      updateEvent(
        end_date: $endDate
        init_date: $initDate
        description: $description
        id: $updateEventId
      ) {
        id
        description
      }
    }
  `;

  deleteEvent = gql`
    mutation DeleteEventMutation($deleteEventId: String!) {
      deleteEvent(id: $deleteEventId)
    }
  `;
  handleGetEvents(id: string) {
    const getEvents = this.apollo.watchQuery<any>({
      query: this.listEvents,
      variables: {
        userId: id,
      },
    });

    return getEvents;
  }

  handleCreateEvent(event: Evento, user_id: string) {
    const createEvents = this.apollo.mutate({
      mutation: this.createEvent,
      variables: {
        userId: user_id,
        initDate: event.init_date,
        endDate: event.end_date,
        description: event.description,
      },
    });
    return createEvents;
  }
  handleUpdateEvent(event: Evento) {
    console.log('evento que chegou no service',event)
    const updateEvents = this.apollo.mutate({
      mutation:this.updateEvent,
      variables:{
        updateEventId: event.id,
        initDate: event.init_date,
        endDate: event.end_date,
        description: event.description
      }
    })
    return updateEvents;
  }

  handleDeleteEvent(eventId: string) {
    const deletedEvent = this.apollo.mutate({
      mutation:this.deleteEvent,
      variables:{
        deleteEventId:eventId
      }
    })

    return deletedEvent;
  }
}
