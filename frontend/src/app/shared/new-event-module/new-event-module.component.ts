import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import feather from 'feather-icons';
import { Evento } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-new-event-modal',
  templateUrl: './new-event-module.component.html',
  styleUrls: ['./new-event-module.component.scss']
})
export class NewEventModuleComponent implements OnInit {

  constructor(private eventService:EventsService) { }


  @Output() closeModal = new EventEmitter();

  newEvent:Evento={
    id: '',
    description: '',
    init_date:'',
    end_date: ''
  };

  modalHandler(){
    this.closeModal.emit({isModalActive:false})   
  }

  handleCreateEvents(){
    console.log(this.newEvent)
    const userId = localStorage.getItem('id')!;
    this.eventService.handleCreateEvent(this.newEvent,userId).subscribe(
      ({data})=>{console.log(data)
        this.modalHandler()
        this.newEvent={
          id: '',
          description: '',
          init_date: Date.now(),
          end_date: Date.now()
        }
      },
      (error)=>{alert(error)}
    )
  }

  ngOnInit(): void {
    feather.replace()
  }

}
