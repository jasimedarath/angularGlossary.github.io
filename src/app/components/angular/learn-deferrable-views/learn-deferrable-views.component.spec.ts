import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDeferrableViewsComponent } from './learn-deferrable-views.component';

describe('LearnDeferrableViewsComponent', () => {
  let component: LearnDeferrableViewsComponent;
  let fixture: ComponentFixture<LearnDeferrableViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnDeferrableViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnDeferrableViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
