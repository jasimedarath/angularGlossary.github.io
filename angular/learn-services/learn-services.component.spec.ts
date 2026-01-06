import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnServicesComponent } from './learn-services.component';

describe('LearnServicesComponent', () => {
  let component: LearnServicesComponent;
  let fixture: ComponentFixture<LearnServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
