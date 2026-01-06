import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnLifecyclehooksComponent } from './learn-lifecyclehooks.component';

describe('LearnLifecyclehooksComponent', () => {
  let component: LearnLifecyclehooksComponent;
  let fixture: ComponentFixture<LearnLifecyclehooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnLifecyclehooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnLifecyclehooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
