import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnUnittestingComponent } from './learn-unittesting.component';

describe('LearnUnittestingComponent', () => {
  let component: LearnUnittestingComponent;
  let fixture: ComponentFixture<LearnUnittestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnUnittestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnUnittestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
