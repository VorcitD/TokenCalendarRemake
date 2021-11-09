import {EntityRepository, Repository} from "typeorm";
import { Eventos } from "../models/Eventos";

@EntityRepository(Eventos)
export class EventsRepository extends Repository<Eventos> {
}