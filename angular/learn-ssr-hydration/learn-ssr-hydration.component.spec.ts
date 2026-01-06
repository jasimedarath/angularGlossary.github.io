import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSsrHydrationComponent } from './learn-ssr-hydration.component';

describe('LearnSsrHydrationComponent', () => {
  let component: LearnSsrHydrationComponent;
  let fixture: ComponentFixture<LearnSsrHydrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnSsrHydrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnSsrHydrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
