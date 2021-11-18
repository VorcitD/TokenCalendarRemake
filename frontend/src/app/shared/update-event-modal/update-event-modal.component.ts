import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import feather from 'feather-icons';
import { Evento } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-update-event-modal',
  templateUrl: './update-event-modal.component.html',
  styleUrls: ['./update-event-modal.component.scss'],
})
export class UpdateEventModalComponent implements OnInit {
  constructor(private eventService: EventsService) {}

  @Input()
  updateEvent: Evento = {
    id: '',
    description: '',
    init_date: new Date(),
    end_date: new Date(),
  };

  event: Evento = {
    id: '',
    description: '',
    init_date: new Date(),
    end_date: new Date(),
  };

  @Output() closeModal = new EventEmitter();

  modalHandler() {
    this.closeModal.emit({ isModalActive: false });
  }

  handleUpdateEvent() {
    console.log('Chamou HAndle Update', this.eventService);

    console.log(this.event.end_date);

    var date = new Date(this.event.end_date);
    console.log(date.getTime());
    console.log(date);
    
    this.eventService.handleUpdateEvent(this.event).subscribe(
      ({ data }) => {
        this.modalHandler();
      },
      (error) => {
        alert(error);
      }
    );
  }

  ngOnInit(): void {
    feather.replace();
    console.log('chega assim do template pai',this.updateEvent)
    this.event.init_date = this.updateEvent.init_date;
    this.event.end_date = this.updateEvent.end_date;
    this.event.description = this.updateEvent.description;
    this.event.id = this.updateEvent.id;
  }
}
