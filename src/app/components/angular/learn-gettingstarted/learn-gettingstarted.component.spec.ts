import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnGettingstartedComponent } from './learn-gettingstarted.component';

describe('LearnGettingstartedComponent', () => {
  let component: LearnGettingstartedComponent;
  let fixture: ComponentFixture<LearnGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
