import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSignalsComponent } from './learn-signals.component';

describe('LearnSignalsComponent', () => {
  let component: LearnSignalsComponent;
  let fixture: ComponentFixture<LearnSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
