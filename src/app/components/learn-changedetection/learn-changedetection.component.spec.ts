import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnChangedetectionComponent } from './learn-changedetection.component';

describe('LearnChangedetectionComponent', () => {
  let component: LearnChangedetectionComponent;
  let fixture: ComponentFixture<LearnChangedetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnChangedetectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnChangedetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
