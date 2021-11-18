import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Eventos } from "../../../models/Eventos";
import { EventsRepository } from "../../../repositories/EventsRepository";
import { UserRepository } from "../../../repositories/UserRepository";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../../../models/User";
import { isAfter } from "date-fns";

@Resolver()
export default class EventsResolver {
  private EventsRepository: Repository<Eventos>;
  private UserRepository: Repository<User>;

  constructor() {
    this.EventsRepository = getCustomRepository(EventsRepository);
    this.UserRepository = getCustomRepository(UserRepository);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async createEvent(
    @Arg("description") description: string,
    @Arg("init_date") init_date: string,
    @Arg("end_date") end_date: string,
    @Arg("user_id") user_id: string
  ) {
    const iDate = Date.parse(init_date);
    const eDate = Date.parse(end_date);

    const dateNow = Date.now();

    if (isAfter(dateNow, iDate)) {
      throw new Error("A data de inicio do evento é uma data passada");
    }

    if (isAfter(iDate, eDate)) {
      throw new Error(
        "A data de término é anterior á data de inicio do evento"
      );
    }

    const user = await this.UserRepository.findOne(user_id);
    if (user) {
      const newEvent = this.EventsRepository.create({
        user,
        description,
        init_date,
        end_date,
      });
      await this.EventsRepository.save(newEvent);
      console.log(newEvent);
      return true;
    } else {
      throw new Error("User does not exist");
    }
  }
  @Authorized()
  @Mutation(() => Eventos)
  async updateEvent(
    @Arg("description") description: string | null,
    @Arg("init_date") init_date: string | null,
    @Arg("end_date") end_date: string | null,
    @Arg("id") id: string
  ) {
    const dateNow = Date.now();

    const updatedEvent = await this.EventsRepository.findOne(id);

    console.log('CHEGOU NO BACKEND A REQUISIÇÃO')

    if (updatedEvent) {
      if (description) {
        updatedEvent.description = description;
      }

      if (init_date && end_date) {//Se forem passados tanto a data inicial quanto a data final para update
        console.log('Entrou aqui')
        const iDate = Date.parse(init_date);
        const eDate = Date.parse(end_date);
        if (isAfter(dateNow, iDate)) {
          throw new Error("A data de inicio do evento é uma data passada");
        }
        if (isAfter(iDate, eDate)) {
          throw new Error(
            "A data de término é anterior á data de inicio do evento"
          );
        }

        updatedEvent.init_date = init_date;
        updatedEvent.end_date = end_date;

      } else if (init_date) {//Caso seja passado somente a data inicial
        

        const iDate = Date.parse(init_date);
        const eDate = Date.parse(updatedEvent.end_date);

        if (isAfter(dateNow, iDate)) {
          throw new Error("A data de inicio do evento é uma data passada");
        }
        if (isAfter(iDate, eDate)) {
          throw new Error(
            "A data de término é anterior á data de inicio do evento"
          );
        }
        
        updatedEvent.init_date = init_date;

      } else if (end_date) {
        const iDate = Date.parse(updatedEvent.init_date);
        const eDate = Date.parse(end_date);

        if (isAfter(iDate, eDate)) {
          throw new Error(
            "A data de término é anterior á data de inicio do evento"
          );
        }
        updatedEvent.end_date = end_date;
      }
      console.log(updatedEvent)
      this.EventsRepository.save(updatedEvent);

    } else {
      throw new Error("No event matches this id");
    }

    return updatedEvent;
  }
  @Authorized()
  @Mutation(() => Boolean)
  async deleteEvent(@Arg("id") id: string) {
    const checkEvent = this.EventsRepository.findOne({ id });

    if (checkEvent) {
      this.EventsRepository.delete({ id });
      return true;
    } else {
      throw new Error("No Event matches this id");
    }
  }
  @Authorized()
  @Query(() => [Eventos])
  async Eventos(@Arg("user_id") user_id: string) {
    const listEventsPerUser = await this.EventsRepository.find({ user_id });
    console.log(listEventsPerUser);
    return listEventsPerUser;
  }
}
