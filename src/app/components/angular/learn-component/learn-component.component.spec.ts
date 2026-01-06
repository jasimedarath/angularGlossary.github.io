import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnComponentComponent } from './learn-component.component';

describe('LearnComponentComponent', () => {
  let component: LearnComponentComponent;
  let fixture: ComponentFixture<LearnComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
