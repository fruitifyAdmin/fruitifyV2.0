import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLandingComponent } from './events-landing.component';

describe('EventsLandingComponent', () => {
  let component: EventsLandingComponent;
  let fixture: ComponentFixture<EventsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
