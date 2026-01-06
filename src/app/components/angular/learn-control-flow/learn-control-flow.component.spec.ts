import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnControlFlowComponent } from './learn-control-flow.component';

describe('LearnControlFlowComponent', () => {
  let component: LearnControlFlowComponent;
  let fixture: ComponentFixture<LearnControlFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnControlFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnControlFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
