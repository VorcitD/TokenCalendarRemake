import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Evento } from 'src/app/models/events.model';
import {replace} from 'feather-icons';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events:Evento[]=[];

  isNewEventModalActive:boolean=false;  
  isUpdateEventModalActive:boolean=false;

  updateEvent:Evento={
    id:"",
    description:"",
    end_date:"",
    init_date:"",
  };

  constructor(private eventService:EventsService) { }


  newEventModalActivator(){
    this.isNewEventModalActive=!this.isNewEventModalActive;
  }

  updateEventModalActivator(evento:Evento){
    this.updateEvent=evento;
    this.isUpdateEventModalActive=!this.isUpdateEventModalActive;
  }

  handleGetEvents(){
    const userId=localStorage.getItem('id')!;
    this.eventService.handleGetEvents(userId).valueChanges.subscribe(
      ({data})=>{
        this.events=data.Eventos;
      }
    )
  }

  handleDeleteEvent(event:Evento){
    this.eventService.handleDeleteEvent(event.id).subscribe(
      ()=>{
        location.reload();
        console.log('evento deletado com sucesso')
      }
      
    );
  }


  ngOnInit(): void {
    this.handleGetEvents();
    replace();
  }

}
