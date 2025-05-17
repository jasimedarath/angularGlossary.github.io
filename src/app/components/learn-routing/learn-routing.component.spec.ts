import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnRoutingComponent } from './learn-routing.component';

describe('LearnRoutingComponent', () => {
  let component: LearnRoutingComponent;
  let fixture: ComponentFixture<LearnRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
