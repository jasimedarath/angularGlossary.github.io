import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnGuardsComponent } from './learn-guards.component';

describe('LearnGuardsComponent', () => {
  let component: LearnGuardsComponent;
  let fixture: ComponentFixture<LearnGuardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnGuardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
