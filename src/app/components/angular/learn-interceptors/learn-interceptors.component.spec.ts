import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnInterceptorsComponent } from './learn-interceptors.component';

describe('LearnInterceptorsComponent', () => {
  let component: LearnInterceptorsComponent;
  let fixture: ComponentFixture<LearnInterceptorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnInterceptorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnInterceptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
