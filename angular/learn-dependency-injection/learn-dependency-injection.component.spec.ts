import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDependencyInjectionComponent } from './learn-dependency-injection.component';

describe('LearnDependencyInjectionComponent', () => {
  let component: LearnDependencyInjectionComponent;
  let fixture: ComponentFixture<LearnDependencyInjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnDependencyInjectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnDependencyInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
