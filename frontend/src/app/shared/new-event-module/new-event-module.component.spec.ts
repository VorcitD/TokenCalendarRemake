import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventModuleComponent } from './new-event-module.component';

describe('NewEventModuleComponent', () => {
  let component: NewEventModuleComponent;
  let fixture: ComponentFixture<NewEventModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
